function SummaryCard({ title, value }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
        ₹{value}
      </p>
    </div>
  );
}

export default SummaryCard;