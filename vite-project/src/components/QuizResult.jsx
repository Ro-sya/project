import { useParams } from "react-router-dom";
import { StorageService } from "../services/storage";

function getResultDetails(summary) {
  const parts = summary.split("/");
  if (parts.length !== 2) {
    return {
      message: "Result could not be determined.",
      image: "default.png",
      className: "default",
    };
  }

  const score = parseInt(parts[0]);
  const maxScore = parseInt(parts[1]);
  const percentage = (score / maxScore) * 100;

  let message = "";
  let image = "";
  let className = "";

  if (percentage >= 70) {
    message = "Excellent Result";
    image = "/images/success.jpg";
    className = "success";
  } else if (percentage >= 30 && percentage < 70) {
    message = "Good Result";
    image = "/images/good.jpg";
    className = "good";
  } else {
    message = "Try Again";
    image = "/images/fail.jpg";
    className = "failure";
  }

  return { message, image, className };
}

export default function QuizResult() {
  const { ts } = useParams();
  const result = (StorageService.get("results") || []).find(
    (r) => r.timestamp === ts
  );

  if (!result) return <p>Result not found.</p>;

  const resultDetails = getResultDetails(result.summary);

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${resultDetails.className}`}>
        <h2>{result.quizName}</h2>

        <p className="score-text">
          <strong>Your Score:</strong> {result.summary}
        </p>
        <p className="result-message">{resultDetails.message}</p>

        <div className="result-image-container">
          {/* NOTE: Ensure these images exist in your public folder */}
          <img
            src={resultDetails.image}
            alt="Quiz Result"
            className="result-image"
          />
        </div>

        <a className="btn modal-btn" href="/">
          Back to home
        </a>
      </div>
    </div>
  );
}
