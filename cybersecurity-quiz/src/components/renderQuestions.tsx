import { FormControl, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from "@mui/material";
import { questions as baseQuestions } from "../data/questions";

interface Question {
  question: string;
  choices: string[];
  correctAnswers: number[];
  multiple: boolean;
}

export const questions: Question[] = baseQuestions.map((question) => ({
  ...question,
  multiple: question.correctAnswers.length > 1,
}));

interface RenderQuestionProps {
  question: Question;
  selected: number[];
  handleChange: (index: number, multiple: boolean) => void;
}

export const renderQuestion = ({ question, selected, handleChange }: RenderQuestionProps) => {
  const { question: questionText, choices, multiple } = question;

  return (
    <div key={questionText} style={{ marginBottom: '1rem' }}>
      <h3>{questionText}</h3>
      <FormControl component="fieldset">
        {multiple ? (
          <FormGroup>
            {choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selected.includes(index)}
                    onChange={() => handleChange(index, multiple)}
                  />
                }
                label={choice}
              />
            ))}
          </FormGroup>
        ) : (
          <RadioGroup value={selected[0] ?? ''} onChange={(e) => handleChange(parseInt(e.target.value), multiple)}>
            {choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </div>
  );
};
