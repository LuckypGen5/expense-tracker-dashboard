export default function SummaryCards({ summary }) {
  const totalAmount = Number(summary?.overview?.totalAmount || 0).toFixed(2);
  const totalCount = summary?.overview?.totalCount || 0;

  const topCategory = summary?.byCategory?.[0]?.category || "N/A";
  const topCategoryAmount = Number(summary?.byCategory?.[0]?.total || 0).toFixed(2);

  const cards = [
    {
      title: "Total Expenses",
      value: `₹ ${totalAmount}`,
      color: "bg-blue-600",
    },
    {
      title: "Total Entries",
      value: totalCount,
      color: "bg-purple-600",
    },
    {
      title: "Top Category",
      value: topCategory,
      color: "bg-emerald-600",
    },
    {
      title: "Top Category Spend",
      value: `₹ ${topCategoryAmount}`,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">{card.title}</p>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">{card.value}</h2>

            <div
              className={`h-10 w-10 rounded-xl ${card.color} opacity-90`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}