import { useStore } from "../store/useStore";
import SummaryCard from "../components/cards/SummaryCard";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";

function Dashboard() {
  const transactions = useStore((state) => state.transactions);

  // 💰 totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = totalIncome - totalExpense;

  // 📊 balance trend data
  let runningBalance = 0;

  const chartData = transactions.map((tx) => {
    const change = tx.type === "income" ? tx.amount : -tx.amount;
    runningBalance += change;

    return {
      date: tx.date,
      balance: runningBalance,
    };
  });

  // 🥧 category breakdown
  const categoryData = Object.values(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        if (!acc[tx.category]) {
          acc[tx.category] = { name: tx.category, value: 0 };
        }
        acc[tx.category].value += tx.amount;
        return acc;
      }, {})
  );

  // 💡 insights
  const highestCategory = categoryData.sort(
    (a, b) => b.value - a.value
  )[0];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={totalIncome} />
        <SummaryCard title="Expense" value={totalExpense} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BalanceChart data={chartData} />
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
        <h3 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Insights
        </h3>

        {highestCategory ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            You spent the most on{" "}
            <span className="font-semibold">{highestCategory.name}</span> (₹
            {highestCategory.value})
          </p>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No data available
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;