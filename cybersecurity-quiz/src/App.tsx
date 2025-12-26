// src/App.tsx
import { Routes, Route } from "react-router-dom";
import QuizSelectionPage from "./components/QuizSelectionPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizSelectionPage />} />
      <Route path="/quiz/:quizType" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
