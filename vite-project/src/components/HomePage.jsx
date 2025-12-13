import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <div className="card action-card">
        <h3>Create a new quiz</h3>
        <p>Start developing your own quiz right now.</p>
        <Link className="btn primary" to="/create">
          Start Creating
        </Link>
      </div>

      <div className="card action-card">
        <h3>View available quizzes</h3>
        <p>Check out the quizzes already saved in your system.</p>
        <Link className="btn primary ghost" to="/list">
          Go to Quizzes
        </Link>
      </div>

      <p className="footer-note">
        Use the navigation bar above for quick access.
      </p>
    </main>
  );
}
