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
    if (!testName.trim()) return alert("Please specify the quiz name");

    // Simple validation
    if (questions.length === 0 || questions.some((q) => q.options.length < 2)) {
      return alert(
        "The quiz must contain at least one question with a minimum of two options."
      );
    }
    if (questions.some((q) => !q.options.some((o) => o.isCorrect))) {
      return alert(
        "Every question must have at least one correct answer selected."
      );
    }

    const quiz = {
      name: testName,
      description: desc,
      questions,
    };

    StorageService.updateQuiz(quiz, name);
    alert("Saved!");
    navigate("/list");
  };

  return (
    <main>
      <h2>{name ? "Editing quiz" : "Creating quiz"}</h2>

      <div className="card form-card">
        <label className="input-group">
          Quiz Name:
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter the quiz name"
          />
        </label>

        <label className="input-group">
          Description:
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="A short description of the quiz"
          />
        </label>

        <hr className="divider" />

        <h3>Questions:</h3>

        <div>
          {questions.map((q, qi) => (
            <div className="card question-card" key={qi}>
              <div className="q-header">
                <label className="input-group">
                  Question {qi + 1}:
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestionText(qi, e.target.value)}
                    placeholder="Enter the question text"
                  />
                </label>
                <button
                  className="btn tiny danger"
                  onClick={() => removeQuestion(qi)}
                  title="Remove question"
                >
                  🗑 Remove
                </button>
              </div>

              <div className="options-list">
                <h4>Answer Options:</h4>
                {q.options.map((o, oi) => (
                  <div className="opt" key={oi}>
                    <label className="input-group opt-input">
                      Option {oi + 1}:
                      <input
                        type="text"
                        value={o.text || ""}
                        onChange={(e) =>
                          updateOpt(qi, oi, "text", e.target.value)
                        }
                        placeholder="Option text"
                      />
                    </label>

                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        checked={o.isCorrect || false}
                        onChange={(e) =>
                          updateOpt(qi, oi, "isCorrect", e.target.checked)
                        }
                      />
                      <span>Correct</span>
                    </label>
                  </div>
                ))}
              </div>

              <button
                className="btn tiny secondary ghost add-opt-btn"
                onClick={() => addOpt(qi)}
              >
                + Add Option
              </button>
            </div>
          ))}
        </div>

        <button
          className="btn secondary ghost add-question-btn"
          onClick={addQuestion}
        >
          + Add Question
        </button>
        <button className="btn primary save-btn" onClick={save}>
          {name ? "Save Changes" : "Create Quiz"}
        </button>
      </div>
    </main>
  );
}
