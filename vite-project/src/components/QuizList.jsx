import { Link } from "react-router-dom";
import { StorageService } from "../services/storage";

export default function QuizList() {
  const quizzes = StorageService.get("quizzes") || [];

  const remove = (name) => {
    if (confirm("Видалити тест?")) {
      StorageService.removeQuiz(name);
      location.reload();
    }
  };

  return (
    <main className="container">
      <h1>Мої тести</h1>

      <Link className="btn" to="/create">
        Створити тест
      </Link>

      {quizzes.length === 0 && <p className="muted">Поки немає тестів.</p>}

      {quizzes.map((q) => (
        <div className="card" key={q.name}>
          <h3>{q.name}</h3>
          <p>{q.description}</p>

          <div className="actions">
            <Link className="btn" to={`/quiz/${q.name}`}>
              Почати
            </Link>
            <Link className="btn ghost" to={`/edit/${q.name}`}>
              Редагувати
            </Link>
            <button className="btn danger" onClick={() => remove(q.name)}>
              Видалити
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
