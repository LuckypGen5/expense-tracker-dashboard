export default function SummaryLists({ summary }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900">Category Breakdown</h3>
          <p className="mt-1 text-sm text-slate-500">
            See where most of your money is being spent.
          </p>
        </div>

        {summary?.byCategory?.length ? (
          <div className="space-y-3">
            {summary.byCategory.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.category}</p>
                  <p className="text-xs text-slate-500">Spending category</p>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  ₹ {Number(item.total).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No category data available.
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900">Monthly Totals</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track your spending month by month.
          </p>
        </div>

        {summary?.byMonth?.length ? (
          <div className="space-y-3">
            {summary.byMonth.map((item) => (
              <div
                key={item.month}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.month}</p>
                  <p className="text-xs text-slate-500">Monthly summary</p>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  ₹ {Number(item.total).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No monthly data available.
          </div>
        )}
      </div>
    </div>
  );
}