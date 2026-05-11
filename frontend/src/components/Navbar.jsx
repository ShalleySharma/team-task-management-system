import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Task Manager</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/tasks">Tasks</Link>

        <Link to="/teams">Teams</Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}