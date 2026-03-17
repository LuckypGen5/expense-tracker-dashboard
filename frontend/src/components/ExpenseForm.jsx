import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  amount: "",
  category: "",
  expense_date: "",
  notes: "",
};

export default function ExpenseForm({ onSubmit, editingExpense, clearEditing }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "",
        expense_date: editingExpense.expense_date?.slice(0, 10) || "",
        notes: editingExpense.notes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!editingExpense) {
      setForm(initialForm);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-xl font-bold text-slate-900">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h3>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="expense_date"
          type="date"
          value={form.expense_date}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={clearEditing}
              className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}