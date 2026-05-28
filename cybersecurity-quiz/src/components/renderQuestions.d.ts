interface Question {
    question: string;
    choices: string[];
    correctAnswers: number[];
    multiple: boolean;
}
export declare const questions: Question[];
interface RenderQuestionProps {
    question: Question;
    selected: number[];
    handleChange: (index: number, multiple: boolean) => void;
}
export declare const renderQuestion: ({ question, selected, handleChange }: RenderQuestionProps) => import("react/jsx-runtime").JSX.Element;
export {};
