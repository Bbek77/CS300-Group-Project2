import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("user", name);
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}