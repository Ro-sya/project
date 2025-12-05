import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StorageService } from "../services/storage";

export default function CreateQuiz() {
  const { name } = useParams();
  const navigate = useNavigate();

  const editingQuiz = name ? StorageService.findQuiz(name) : null;

  const [testName, setTestName] = useState(editingQuiz?.name || "");
  const [desc, setDesc] = useState(editingQuiz?.description || "");
  const [questions, setQuestions] = useState(
    editingQuiz?.questions || [{ text: "", options: [{}, {}] }]
  );

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: [{}, {}] }]);
  };

  const removeQuestion = (i) => {
    setQuestions(questions.filter((_, x) => x !== i));
  };

  const updateQuestionText = (i, text) => {
    const copy = [...questions];
    copy[i].text = text;
    setQuestions(copy);
  };

  const addOpt = (qi) => {
    const copy = [...questions];
    copy[qi].options.push({});
    setQuestions(copy);
  };

  const updateOpt = (qi, oi, field, value) => {
    const copy = [...questions];
    copy[qi].options[oi][field] = value;
    setQuestions(copy);
  };

  const save = () => {
    if (!testName.trim()) return alert("Вкажіть назву тесту");

    const quiz = {
      name: testName,
      description: desc,
      questions,
    };

    StorageService.updateQuiz(quiz, name);
    alert("Збережено!");
    navigate("/");
  };

  return (
    <main className="container">
      <h1>{name ? "Редагування" : "Створення"} тесту</h1>

      <div className="card">
        <label>
          Назва тесту:
          <input
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
        </label>

        <label>
          Опис:
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>

        <div>
          {questions.map((q, qi) => (
            <div className="question" key={qi}>
              <div className="q-header">
                <label>
                  Питання:
                  <input
                    value={q.text}
                    onChange={(e) => updateQuestionText(qi, e.target.value)}
                  />
                </label>
                <button
                  className="btn tiny danger"
                  onClick={() => removeQuestion(qi)}
                >
                  🗑
                </button>
              </div>

              {q.options.map((o, oi) => (
                <div className="opt" key={oi}>
                  <label>
                    Варіант:
                    <input
                      value={o.text || ""}
                      onChange={(e) =>
                        updateOpt(qi, oi, "text", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Правильний
                    <input
                      type="checkbox"
                      checked={o.isCorrect || false}
                      onChange={(e) =>
                        updateOpt(qi, oi, "isCorrect", e.target.checked)
                      }
                    />
                  </label>
                </div>
              ))}

              <button className="btn tiny ghost" onClick={() => addOpt(qi)}>
                + Варіант
              </button>
            </div>
          ))}
        </div>

        <button className="btn ghost" onClick={addQuestion}>
          + Питання
        </button>
        <button className="btn" onClick={save}>
          Зберегти
        </button>
      </div>
    </main>
  );
}
