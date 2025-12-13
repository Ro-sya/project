import { Link } from "react-router-dom";
import { StorageService } from "../services/storage";

export default function QuizList() {
  const quizzes = StorageService.get("quizzes") || [];

  const remove = (name) => {
    if (confirm("Delete this quiz?")) {
      StorageService.removeQuiz(name);
      // Using location.reload() for simplicity as in original code
      location.reload();
    }
  };

  return (
    <main>
      <h2>Available quizzes</h2>

      <Link className="btn primary" to="/create">
        + Create New Quiz
      </Link>

      {quizzes.length === 0 && (
        <p className="muted">
          There are no quizzes created yet. Click "Create New Quiz" to add the
          first one
        </p>
      )}

      <div className="quiz-grid">
        {quizzes.map((q) => (
          <div className="card quiz-item" key={q.name}>
            <h3>{q.name}</h3>
            <p className="desc-text">{q.description}</p>

            <div className="actions">
              <Link className="btn success" to={`/quiz/${q.name}`}>
                Start
              </Link>
              <Link className="btn secondary ghost" to={`/edit/${q.name}`}>
                Edit
              </Link>
              <button className="btn danger" onClick={() => remove(q.name)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
