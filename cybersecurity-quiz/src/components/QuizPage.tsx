import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { questions as cybersecurityQuestions } from "../data/questions";
import { questions as az500Questions } from "../data/az500Questions";
import { shuffleArray } from "../utils/helpers";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
  explanation?: string;
}

const QuizPage = () => {
  const { quizType } = useParams<{ quizType: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const rawQuestions =
    quizType === "az500" ? az500Questions : cybersecurityQuestions;

  const defaultTime = quizType === "az500" ? 15 : 25;
  const timePerQuestion: number =
    location.state?.timePerQuestion ||
    parseInt(localStorage.getItem("quiz_time_per_question") || "") ||
    defaultTime;

  const [questions] = useState<Question[]>(() =>
    shuffleArray(
      rawQuestions.map((q) => {
        const structuredChoices = q.choices.map((text, index) => ({
          text,
          isCorrect: q.correctAnswers.includes(index),
        }));
        return {
          question: q.question,
          explanation: q.explanation,
          choices: shuffleArray(structuredChoices),
        };
      })
    )
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(timePerQuestion);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const isMultiple = currentQuestion.choices.filter((c) => c.isCorrect).length > 1;

  const isCorrect = useMemo(() => {
    const selectedCorrect = selected
      .map((i) => currentQuestion.choices[i])
      .filter((c) => c?.isCorrect).length;

    const totalCorrect = currentQuestion.choices.filter((c) => c.isCorrect).length;
    return selectedCorrect === totalCorrect && selected.length === totalCorrect;
  }, [selected, currentQuestion]);

  const correctCount = useMemo(() => {
    return answers.reduce((count, answer, i) => {
      const q = questions[i];
      const expected = q.choices.filter((c) => c.isCorrect).length;
      const correctSelections = answer
        .map((a) => q.choices[a])
        .filter((c) => c?.isCorrect).length;

      return correctSelections === expected && correctSelections === answer.length
        ? count + 1
        : count;
    }, 0);
  }, [answers, questions]);

  useEffect(() => {
    if (showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleValidate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, showAnswer]);

  const handleChange = (index: number) => {
    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setSelected([index]);
    }
  };

  const handleValidate = () => {
    setShowAnswer(true);
    setShowNextButton(true);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);
    setSelected([]);
    setShowAnswer(false);
    setShowNextButton(false);
    setTimeLeft(timePerQuestion);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", {
        state: { answers: updatedAnswers, questions },
      });
    }
  };

  return (
    <Box
      bgcolor="#1f2937"
      color="white"
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid #374151"
      borderRadius={3}
    >
      <Box width="100%" maxWidth={600}>
        <Typography variant="h5" gutterBottom>
          Question {currentIndex + 1} / {questions.length}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: "#10B981", fontWeight: "bold" }}
        >
          Right Answers : {correctCount} / {questions.length}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Time left: {timeLeft}s
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(timeLeft / timePerQuestion) * 100}
          sx={{ width: "100%", mb: 2 }}
        />
        <Typography variant="body1" gutterBottom>
          {currentQuestion.question}
        </Typography>

        {showAnswer && (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                color: isCorrect ? "#10B981" : "#EF4444",
                fontWeight: "bold",
                mt: 2,
                mb: 1,
              }}
            >
              {isCorrect ? "✔️ Bonne réponse" : "❌ Mauvaise réponse"}
            </Typography>
            {currentQuestion.explanation && (
              <Typography variant="body2" sx={{ color: "#cbd5e1", mt: 1 }}>
                {currentQuestion.explanation}
              </Typography>
            )}
          </>
        )}

        <FormControl component="fieldset">
          {isMultiple ? (
            <FormGroup>
              {currentQuestion.choices.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selected.includes(index)}
                      onChange={() => handleChange(index)}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          borderRadius: 0,
                          color: "#9ca3af",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#00B4D8",
                        },
                      }}
                    />
                  }
                  label={choice.text}
                />
              ))}
            </FormGroup>
          ) : (
            <RadioGroup
              value={selected[0] ?? -1}
              onChange={(e) => handleChange(parseInt(e.target.value))}
            >
              {currentQuestion.choices.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "#9ca3af",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#00B4D8",
                        },
                      }}
                    />
                  }
                  label={choice.text}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </Box>

      <Box mt={3}>
        {showNextButton ? (
          <Button variant="contained" onClick={handleNext}>
            Question suivante
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleValidate}
            disabled={showAnswer}
          >
            Valider
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuizPage;
