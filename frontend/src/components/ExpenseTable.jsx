export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Recent Expenses</h3>
          <p className="mt-1 text-sm text-slate-500">
            Review, edit, or remove your latest expense entries.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((item) => (
                <tr key={item.id} className="rounded-2xl bg-slate-50">
                  <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-slate-900">
                    {item.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    ₹ {Number(item.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.expense_date?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {item.notes || "-"}
                  </td>
                  <td className="rounded-r-2xl px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-600"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500"
                >
                  No expenses added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}