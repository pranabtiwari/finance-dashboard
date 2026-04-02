import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useStore } from "./store/useStore";

function App() {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <div
      className={
        darkMode
          ? "dark bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-white min-h-screen"
          : "bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 text-slate-900 min-h-screen"
      }
    >
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500 text-white text-xl shadow-sm">
                ₹
              </span>
              <span>Finance Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your balance, spending, and cashflow in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Role:&nbsp;</span>
              <span className="capitalize">{role}</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span className="text-base">
                {darkMode ? "☀️" : "🌙"}
              </span>
              <span>{darkMode ? "Light mode" : "Dark mode"}</span>
            </button>

            {/* Role Switch */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </header>

        {/* Layout */}
        <main className="grid gap-6 lg:grid-cols-[2fr,1.4fr] items-start">
          <Dashboard />
          <Transactions />
        </main>
      </div>
    </div>
  );
}

export default App;