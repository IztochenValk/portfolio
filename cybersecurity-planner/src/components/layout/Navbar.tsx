import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/state/actions/authActions";
import DarkModeToggle from "@/components/common/DarkModeToggle";
import { useDispatch } from "react-redux"; // Ajouté

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname.startsWith(path);
  const dispatch = useDispatch(); // Ajouté ici

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());        // <-- important
    navigate("/signin");
  };
  return (

    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center gap-8">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          🛡️ Configurator
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/dashboard"
            className={
              isActive("/dashboard")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            Dashboard
          </Link>
          <Link
            to="/planner"
            className={
              isActive("/planner")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            Planner
          </Link>
          <Link
            to="/reports"
            className={
              isActive("/reports")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            Reports
          </Link>
          <Link
            to="/replay"
            className={
              isActive("/replay")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            Replay
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <DarkModeToggle />
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
