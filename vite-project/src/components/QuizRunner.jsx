import { useParams, useNavigate } from "react-router-dom";
import { StorageService } from "../services/storage";

export default function QuizRunner() {
  const { name } = useParams();
  const navigate = useNavigate();
  const quiz = StorageService.findQuiz(name);

  if (!quiz) return <p>Тест не знайдено</p>;

  const finish = () => {
    let score = 0;

    quiz.questions.forEach((q, qi) => {
      const checked = [
        ...document.querySelectorAll(`input[name="q${qi}"]:checked`),
      ];
      checked.forEach((c) => {
        if (q.options[c.value].isCorrect) score++;
      });
    });

    const ts = new Date().toISOString();
    StorageService.add("results", {
      quizName: quiz.name,
      timestamp: ts,
      summary: `${score}/${quiz.questions.length}`,
    });

    navigate(`/result/${ts}`);
  };

  return (
    <main className="container">
      <h1>{quiz.name}</h1>

      {quiz.questions.map((q, qi) => (
        <div className="card" key={qi}>
          <strong>
            {qi + 1}. {q.text}
          </strong>

          {q.options.map((o, oi) => (
            <label key={oi}>
              <input type="checkbox" name={`q${qi}`} value={oi} />
              {o.text}
            </label>
          ))}
        </div>
      ))}

      <button className="btn" onClick={finish}>
        Завершити
      </button>
    </main>
  );
}
