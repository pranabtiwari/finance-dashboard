import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

function Transactions() {
  const transactions = useStore((state) => state.transactions);
  const addTransaction = useStore((state) => state.addTransaction);
  const role = useStore((state) => state.role);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [showForm, setShowForm] = useState(false);

  // form states
  const [amount, setAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income");

  // ensure admin-only form is hidden for non-admin roles
  useEffect(() => {
    if (role !== "admin" && showForm) {
      setShowForm(false);
    }
  }, [role, showForm]);

  // filter logic
  const filteredTransactions = transactions.filter((tx) => {
    return (
      tx.category.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || tx.category === category)
    );
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Transactions
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white/80 py-2 px-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white/80 p-2 text-sm text-slate-700 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 md:w-48"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
        </select>
      </div>

      {/* Admin Button */}
      {role === "admin" && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Admin tools
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {showForm ? "Close" : "+ Add transaction"}
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mt-2 space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/80 p-2 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

          <input
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/80 p-2 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/80 p-2 text-sm text-slate-700 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            onClick={() => {
              if (!amount || !newCategory) return;

              const newTx = {
                id: Date.now(),
                date: new Date().toISOString().split("T")[0],
                amount: Number(amount),
                category: newCategory,
                type: type,
              };

              addTransaction(newTx);

              // reset
              setAmount("");
              setNewCategory("");
              setType("income");
              setShowForm(false);
            }}
          >
            Save Transaction
          </button>
        </div>
      )}

      {/* Transactions List */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            No transactions found
          </p>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between border-b border-slate-100 py-2 text-sm last:border-b-0 dark:border-slate-800"
            >
              <span>{tx.date}</span>
              <span>{tx.category}</span>

              <span
                className={
                  tx.type === "expense"
                    ? "font-medium text-red-500"
                    : "font-medium text-emerald-500"
                }
              >
                ₹{tx.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;