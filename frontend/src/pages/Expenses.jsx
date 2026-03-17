import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import ExpenseTable from "../components/ExpenseTable";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  const loadExpenses = async () => {
    try {
      const { data } = await API.get("/expenses");
      setExpenses(data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      setMessage("Expense deleted successfully");
      loadExpenses();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="hidden min-h-screen w-64 bg-slate-950 text-white lg:block">
          <div className="border-b border-slate-800 px-6 py-6">
            <h1 className="text-2xl font-bold">ExpenseFlow</h1>
            <p className="mt-2 text-sm text-slate-400">Personal finance dashboard</p>
          </div>

          <div className="px-4 py-6">
            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Workspace</p>
              <h2 className="mt-2 text-lg font-semibold">My Dashboard</h2>
            </div>

            <nav className="mt-6 space-y-2">
              <Link
                to="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900"
              >
                Dashboard
              </Link>
              <Link
                to="/expenses"
                className="block rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
              >
                Expenses
              </Link>
              <Link
                to="/analytics"
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900"
              >
                Analytics
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <Navbar />

          <div className="mx-auto max-w-7xl p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900">All Expenses</h1>
              <p className="mt-2 text-sm text-slate-500">
                View and manage all your expense records in one place.
              </p>
            </div>

            {message && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 shadow-sm">
                {message}
              </div>
            )}

            <ExpenseTable
              expenses={expenses}
              onEdit={() => {}}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
}