import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API_BASE_URL from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginProcess = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
    
      if (!res.ok) {
        setError(data.error || "Login failed");
        console.log("Login failed",data);
      }else{
        const { token } = data;
        localStorage.setItem("token", token);
      }
      return data;
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoged = await loginProcess(email, password);
      if (isLoged.token) {
        navigate("/events");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      id="login-form"
      className="flex flex-col w-1/2 gap-4 p-6 m-auto rounded"
    >
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        className="input input-bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="input input-bordered"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <p className="text-red-400">{error}</p>
      <div className="flex justify-between">
        <button type="submit">login</button>
        <p>
          no account?{" "}
          <Link to="/register" className="text-red-400">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
