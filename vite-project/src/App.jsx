import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./components/HomePage.jsx";
import QuizList from "./components/QuizList.jsx";
import CreateQuiz from "./components/CreateQuiz.jsx";
import QuizRunner from "./components/QuizRunner.jsx";
import QuizResult from "./components/QuizResult.jsx";
import "./styles.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<QuizList />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="edit/:name" element={<CreateQuiz />} />

          <Route path="quiz/:name" element={<QuizRunner />} />
          <Route path="result/:ts" element={<QuizResult />} />

          <Route path="*" element={<h2>404 | Page Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
