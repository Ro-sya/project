import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="topbar">
        <Link to="/">
          <h1 className="logo">MyQuiz</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/list">Available quizzes</Link>
          <Link to="/create">Create quiz</Link>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
