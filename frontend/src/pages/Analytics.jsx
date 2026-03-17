import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Analytics() {
  const [summary, setSummary] = useState({ overview: {}, byCategory: [], byMonth: [] });
  const [message, setMessage] = useState("");

  const loadSummary = async () => {
    try {
      const { data } = await API.get("/expenses/summary");
      setSummary(data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load analytics");
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

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
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900"
              >
                Expenses
              </Link>
              <Link
                to="/analytics"
                className="block rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
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
              <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="mt-2 text-sm text-slate-500">
                Track category insights and monthly spending performance.
              </p>
            </div>

            {message && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 shadow-sm">
                {message}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Category Breakdown</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Spending grouped by category.
                </p>

                <div className="mt-5 space-y-3">
                  {summary?.byCategory?.length ? (
                    summary.byCategory.map((item) => (
                      <div
                        key={item.category}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {item.category}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          ₹ {Number(item.total).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                      No category analytics available.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Monthly Totals</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Monthly spending summary.
                </p>

                <div className="mt-5 space-y-3">
                  {summary?.byMonth?.length ? (
                    summary.byMonth.map((item) => (
                      <div
                        key={item.month}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {item.month}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          ₹ {Number(item.total).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                      No monthly analytics available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}