import { Box, Button, Typography, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizSelectionPage() {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(20);
  const [timePerQuestion, setTimePerQuestion] = useState(25);

  const handleStart = (quizType: string) => {
    localStorage.setItem("quiz_question_count", questionCount.toString());
    localStorage.setItem("quiz_time_per_question", timePerQuestion.toString());
    navigate(`/quiz/${quizType}`, {
      state: { questionCount, timePerQuestion }
    });
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box p={4} bgcolor="#1f2937" borderRadius={3} width="100%" maxWidth="400px" boxShadow={4} color="white" border="1px solid #374151">
        <Typography variant="h4" gutterBottom textAlign="center">
          Choose Your Quiz
        </Typography>

        <Typography variant="body1" mt={2}>Number of Questions:</Typography>
        <Select
          fullWidth
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          sx={{ mt: 1, backgroundColor: "#3a4250", color: "white" }}
        >
          {[10, 20, 40, 50, 60, 80, 100].map((n) => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </Select>

        <Typography variant="body1" mt={3}>Time per question (seconds):</Typography>
        <TextField
          fullWidth
          type="number"
          value={timePerQuestion}
          onChange={(e) => setTimePerQuestion(Number(e.target.value))}
          inputProps={{ min: 5, max: 120 }}
          sx={{ mt: 1, backgroundColor: "#3a4250", input: { color: "white" } }}
        />

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => handleStart("cybersecurity")}>
          Cybersecurity Quiz
        </Button>
        <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleStart("az500")}> 
          AZ-500 Quiz
        </Button>
      </Box>
    </Box>
  );
}

export default QuizSelectionPage;
