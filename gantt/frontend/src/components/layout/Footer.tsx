import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="mt-auto h-14 border-t border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur flex items-center">
      <div className="mx-auto max-w-7xl px-4 w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Gantt Project</div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
        <div className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Torpedobyte Solutions</div>
      </div>
    </footer>
  );
}
