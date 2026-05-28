import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";
import Reports from "@/pages/Reports/Reports";
import Replay from "@/pages/Replay/Replay";
import ThreatOpsPlanner from "@/pages/ThreatOpsPlanner/ThreatOpsPlanner";
import PrivateRoute from "@/routes/PrivateRoute";
import RedirectIfAuthenticated from "@/routes/RedirectIfAuthenticated";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<RedirectIfAuthenticated><SignIn /></RedirectIfAuthenticated>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/planner" element={<PrivateRoute><ThreatOpsPlanner /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      <Route path="/replay" element={<PrivateRoute><Replay /></PrivateRoute>} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
