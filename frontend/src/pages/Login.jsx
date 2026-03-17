import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden w-1/2 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">ExpenseFlow</h1>
          <p className="mt-4 max-w-md text-slate-400">
            A modern expense tracking dashboard to manage, monitor, and improve your spending.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Smart finance tracking</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Keep your money organized with a clean SaaS-style dashboard.
          </h2>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-500">Use your account to continue</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-500">
            Demo: demo@example.com / 123456
          </p>

          {message && <p className="mt-4 text-sm font-medium text-rose-500">{message}</p>}

          <p className="mt-6 text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}