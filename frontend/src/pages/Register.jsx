import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });

  const handleRegister = async () => {
    try {
      await axios.post(
        "/auth/register",
        form
      );

      alert("Registered Successfully");

      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <select
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >
          <option value="member">
            Member
          </option>

          <option value="team_admin">
            Team Admin
          </option>

          <option value="super_admin">
            Super Admin
          </option>
        </select>

        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}