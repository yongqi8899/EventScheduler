import API_BASE_URL from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
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
        setErrorMessage(data.error || "Registration failed");
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isRegisted = await registerUser(email, password);
      if (isRegisted){
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      id="register-form"
      className="flex flex-col w-1/2 gap-4 p-6 m-auto rounded"
    >
      <h1>Register</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMessage && <div className="text-red-400">{errorMessage}</div>}
      <div className="flex justify-between">
        <button type="submit">sign up</button>
        <p>
          you have account?{" "}
          <Link to="/login" className="text-red-400">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
