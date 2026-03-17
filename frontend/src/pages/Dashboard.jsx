import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import SummaryLists from "../components/SummaryLists";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ overview: {}, byCategory: [], byMonth: [] });
  const [editingExpense, setEditingExpense] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const [expenseRes, summaryRes] = await Promise.all([
        API.get("/expenses"),
        API.get("/expenses/summary"),
      ]);
      setExpenses(expenseRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExpenseSubmit = async (formData) => {
    try {
      if (editingExpense) {
        await API.put(`/expenses/${editingExpense.id}`, formData);
        setMessage("Expense updated successfully");
      } else {
        await API.post("/expenses", formData);
        setMessage("Expense added successfully");
      }
      setEditingExpense(null);
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      setMessage("Expense deleted successfully");
      loadData();
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
              className="block rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/expenses"
              className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900"
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
              <h1 className="text-3xl font-bold text-slate-900">Expense Dashboard</h1>
              <p className="mt-2 text-sm text-slate-500">
                Track spending, manage expenses, and view your financial overview.
              </p>
            </div>

            {message && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 shadow-sm">
                {message}
              </div>
            )}

            <SummaryCards summary={summary} />

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <ExpenseTable
                  expenses={expenses}
                  onEdit={setEditingExpense}
                  onDelete={handleDelete}
                />
              </div>

              <div>
                <ExpenseForm
                  onSubmit={handleExpenseSubmit}
                  editingExpense={editingExpense}
                  clearEditing={() => setEditingExpense(null)}
                />
              </div>
            </div>

            <div className="mt-6">
              <SummaryLists summary={summary} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}