require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

const allowedOrigins = [
  "https://u4ili6teto.bg"
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS refusé pour origin: ${origin}`);
    return callback(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | Origin: ${req.headers.origin || "none"}`
  );
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

if (openai) {
  console.log("Client OpenAI initialisé.");
} else {
  console.warn("OPENAI_API_KEY absente : /evaluate sera indisponible.");
}

const CARDS = [
  {
    id: 1,
    type: "word",
    promptFr: "serviette",
    referenceAnswers: ["хавлия", "кърпа", "khavliya", "karpa"]
  },
  {
    id: 2,
    type: "word",
    promptFr: "eau",
    referenceAnswers: ["вода", "voda"]
  },
  {
    id: 3,
    type: "word",
    promptFr: "pain",
    referenceAnswers: ["хляб", "hlyab"]
  },
  {
    id: 4,
    type: "phrase",
    promptFr: "Bonjour",
    referenceAnswers: ["Здравей", "Здравейте", "Zdravey", "Zdraveyte"]
  },
  {
    id: 5,
    type: "phrase",
    promptFr: "Merci beaucoup",
    referenceAnswers: [
      "Много благодаря",
      "Благодаря много",
      "Mnogo blagodarya",
      "Blagodarya mnogo"
    ]
  },
  {
    id: 6,
    type: "phrase",
    promptFr: "Je voudrais une serviette.",
    referenceAnswers: [
      "Искам хавлия.",
      "Може ли една хавлия?",
      "Iskam khavliya.",
      "Mozhe li edna khavliya?"
    ]
  },
  {
    id: 7,
    type: "phrase",
    promptFr: "Je voudrais de l'eau.",
    referenceAnswers: [
      "Искам вода.",
      "Може ли вода?",
      "Iskam voda.",
      "Mozhe li voda?"
    ]
  },
  {
    id: 8,
    type: "phrase",
    promptFr: "Où sont les toilettes ?",
    referenceAnswers: [
      "Къде е тоалетната?",
      "Къде са тоалетните?",
      "Kade e toaletnata?",
      "Kade sa toaletnite?"
    ]
  },
  {
    id: 9,
    type: "phrase",
    promptFr: "Je ne comprends pas.",
    referenceAnswers: [
      "Не разбирам.",
      "Ne razbiram."
    ]
  },
  {
    id: 10,
    type: "phrase",
    promptFr: "Parlez plus lentement, s'il vous plaît.",
    referenceAnswers: [
      "Говорете по-бавно, моля.",
      "Govorete po-bavno, molya."
    ]
  }
];

app.get("/ping", (req, res) => {
  return res.json({
    ok: true,
    message: "Bonjour depuis l'API de Florian",
    timestamp: new Date().toISOString()
  });
});

app.post("/bootstrap-user", (req, res) => {
  const { moodleUserId, source, sentAt } = req.body || {};

  if (!moodleUserId) {
    return res.status(400).json({
      ok: false,
      error: "moodleUserId manquant"
    });
  }

  return res.json({
    ok: true,
    message: "ID utilisateur bien reçu par l'API",
    received: {
      moodleUserId,
      source: source || null,
      sentAt: sentAt || null
    },
    timestamp: new Date().toISOString()
  });
});

app.get("/cards", (req, res) => {
  return res.json({
    ok: true,
    cards: CARDS
  });
});

app.post("/evaluate", async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        ok: false,
        error: "Service OpenAI indisponible : OPENAI_API_KEY manquante"
      });
    }

    const {
      cardId,
      promptFr,
      studentAnswer,
      transcriptSource = "speech",
      referenceAnswers = [],
      moodleUserId = null
    } = req.body || {};

    if (!promptFr || !studentAnswer) {
      return res.status(400).json({
        ok: false,
        error: "promptFr et studentAnswer sont requis"
      });
    }

    const safeReferenceAnswers =
      Array.isArray(referenceAnswers) && referenceAnswers.length > 0
        ? referenceAnswers
        : [];

    const systemPrompt = `
Tu es un évaluateur pédagogique spécialisé en traduction orale du français vers le bulgare.

Contexte :
- l'élève voit un mot ou une phrase en français
- l'élève doit prononcer une réponse en bulgare
- la réponse reçue peut être une transcription vocale imparfaite
- tu dois donc rester flexible si le sens bulgare est clairement correct

Consignes :
- évalue le sens avant la forme exacte
- accepte le cyrillique ou la translittération latine
- accepte de petites erreurs de transcription
- utilise les variantes de référence comme guide, sans t'y limiter strictement

Barème :
1 = incorrect ou hors sujet
2 = partiellement correct mais insuffisant
3 = sens global plutôt correct mais maladroit ou incomplet
4 = bonne réponse
5 = très bonne réponse, naturelle et précise

Réponds UNIQUEMENT en JSON valide :

{
  "score": 1,
  "correct": false,
  "feedback": "commentaire court en français"
}
`.trim();

    const userPrompt = `
Énoncé en français :
"${promptFr}"

Transcription de la réponse orale de l'élève en bulgare :
"${studentAnswer}"

Variantes acceptables :
${JSON.stringify(safeReferenceAnswers, null, 2)}

Source de la transcription :
"${transcriptSource}"
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });
    const raw = completion.choices?.[0]?.message?.content || "";
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      console.error("Réponse IA non JSON :", raw);

      return res.status(500).json({
        ok: false,
        error: "Réponse IA non JSON",
        raw
      });
    }

    return res.json({
      ok: true,
      evaluation: parsed,
      meta: {
        cardId: cardId || null,
        moodleUserId,
        promptFr,
        transcriptSource
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Erreur /evaluate :", err);

    return res.status(500).json({
      ok: false,
      error: "Erreur serveur",
      details: String(err)
    });
  }
});

app.use((req, res) => {
  return res.status(404).json({
    ok: false,
    error: "Route introuvable"
  });
});

app.use((err, req, res, next) => {
  console.error("Erreur Express non gérée :", err);

  return res.status(500).json({
    ok: false,
    error: "Erreur interne du serveur"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API démarrée sur le port ${PORT}`);
});