import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development";

const API_URL =
  NODE_DEV === "production"
    ? import.meta.env.VITE_BASE_API_URL
    : "http://localhost:8081/api";

const Login = () => {
  // Recuperar user a través del contexto del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      const data = await response.json();
      setEmail("");
      setPassword("");

      login(data);
      navigate("/");
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <Layout>
      <>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] items-center flex-1 h-16">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Welcome back
            </h2>
              <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">

              
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Email
                </p>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Password
                </p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#21294a] focus:border-none h-14 placeholder:text-[#8e9acc] p-4 text-base font-normal leading-normal"
                />
              </label>
            </div>
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#4264fa] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log in</span>
              </button>
            </div>
            </form>
            <Link to="/register">
              <p className="text-[#8e9acc] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                Don't have an account? Sign up
              </p>
            </Link>
          </div>
        </div>
      </>
    </Layout>
  );
};

export { Login };
