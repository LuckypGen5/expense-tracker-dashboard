import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden w-1/2 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">ExpenseFlow</h1>
          <p className="mt-4 max-w-md text-slate-400">
            Create your account and start tracking expenses with a modern dashboard experience.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Fast onboarding</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Get started in minutes and manage your finances with clarity.
          </h2>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold text-slate-900">Register</h2>
          <p className="mt-2 text-sm text-slate-500">Create your account</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
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
              Register
            </button>
          </form>

          {message && <p className="mt-4 text-sm font-medium text-rose-500">{message}</p>}

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}