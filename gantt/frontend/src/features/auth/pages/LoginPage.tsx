// frontend/src/pages/LoginPage.tsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "@api";
import { syncNow } from "@sync/syncLocalToRemote";
import { setGuest, clearGuest, isGuest } from "@utils/auth";
import {
  Avatar, Button, TextField, Box, Typography,
  Container, Alert, Paper, Tabs, Tab,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

type Mode = "login" | "signup";

export default function LoginPage({ initialMode }: { initialMode?: Mode }) {
  const navigate = useNavigate();
  const location = useLocation() as any;

  // Redirige si déjà invité (sauf si forceAuth)
  useEffect(() => {
    const forced =
      Boolean((location?.state && location.state.forceAuth) ||
        new URLSearchParams(location.search).get("force") === "1");

    if (!forced && isGuest()) navigate("/projects", { replace: true });
  }, [navigate, location]);

  const startMode: Mode = useMemo(() => {
    if (initialMode) return initialMode;
    return location?.pathname?.endsWith?.("/signup") ? "signup" : "login";
  }, [initialMode, location?.pathname]);

  const [mode, setMode] = useState<Mode>(startMode);
  const [email, setEmail] = useState(mode === "login" ? "test@example.com" : "");
  const [password, setPassword] = useState(mode === "login" ? "test1234" : "");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [ok, setOk] = useState<string | null>(
    location?.state?.signupOK ? "Compte créé. Vous pouvez vous connecter." : null
  );

  const title = mode === "login" ? "S’identifier" : "Créer un compte";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setOk(null); setRemaining(null);
    try {
      const data = await login({ email, password });
      const token = data?.token;
      if (!token) throw new Error("Token manquant");
      localStorage.setItem("authToken", token);
      clearGuest();
      try { await syncNow(); } catch {}
      navigate("/projects", { replace: true });
    } catch (e: any) {
      const msg = e?.message || "Échec de connexion";
      setErr(msg);

      // Cherche "restantes: N" dans le message backend
      const match = msg.match(/restantes?:\s*(\d+)/i);
      if (match) {
        setRemaining(Number(match[1]));
      }
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setOk(null); setRemaining(null);
    if (!email || !password) return setErr("Email et mot de passe requis");
    if (password !== confirm) return setErr("Les mots de passe diffèrent");
    try {
      await signup({ email, password });
      setMode("login");
      setOk("Compte créé. Vous pouvez vous connecter.");
    } catch (e: any) {
      setErr(e?.message || "Échec de l’inscription");
    }
  }

  const onChangeTab = (_: any, newValue: Mode) => {
    setMode(newValue);
    setErr(null);
    setOk(null);
    setRemaining(null);
  };

  function continueOffline() {
    setGuest();
    navigate("/projects", { replace: true });
  }

  return (
    <Container component="main" maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {mode === "login" ? <LockOutlinedIcon /> : <PersonAddAlt1Icon />}
          </Avatar>

          <Typography component="h1" variant="h5">{title}</Typography>

          <Tabs value={mode} onChange={onChangeTab} sx={{ mt: 2, width: "100%" }} variant="fullWidth">
            <Tab value="login" label="S’identifier" />
            <Tab value="signup" label="Créer un compte" />
          </Tabs>

          {ok && <Alert severity="success" sx={{ mt: 2, width: "100%" }}>{ok}</Alert>}
          {err && <Alert severity="error" sx={{ mt: 2, width: "100%" }}>{err}</Alert>}
          {remaining !== null && (
            <Typography
              variant="body2"
              color={remaining <= 2 ? "error" : "textSecondary"}
              sx={{ mt: 1 }}
            >
              Tentatives restantes avant blocage : <strong>{remaining}</strong>
            </Typography>
          )}

          {mode === "login" ? (
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: "100%" }}>
              <TextField margin="normal" required fullWidth id="email" label="Adresse email"
                name="email" autoComplete="username" autoFocus value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <TextField margin="normal" required fullWidth name="password" label="Mot de passe"
                type="password" id="password" autoComplete="current-password" value={password}
                onChange={(e) => setPassword(e.target.value)} />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Se connecter
              </Button>

              <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={continueOffline}>
                ou continuer sans se connecter
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 2, width: "100%" }}>
              <TextField margin="normal" required fullWidth label="Adresse email" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
              <TextField margin="normal" required fullWidth label="Mot de passe" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField margin="normal" required fullWidth label="Confirmer le mot de passe"
                type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                error={!!confirm && confirm !== password}
                helperText={confirm && confirm !== password ? "Les mots de passe diffèrent" : " "} />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
                S’inscrire
              </Button>

              <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => setMode("login")}>
                J’ai déjà un compte
              </Button>

              <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={continueOffline}>
                ou continuer sans se connecter
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
