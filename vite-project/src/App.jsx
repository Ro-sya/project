import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizList from "./components/QuizList";
import CreateQuiz from "./components/CreateQuiz";
import QuizRunner from "./components/QuizRunner";
import QuizResult from "./components/QuizResult";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/edit/:name" element={<CreateQuiz />} />
        <Route path="/quiz/:name" element={<QuizRunner />} />
        <Route path="/result/:ts" element={<QuizResult />} />
      </Routes>
    </BrowserRouter>
  );
}
