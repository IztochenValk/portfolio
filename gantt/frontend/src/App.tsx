import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "@components/layout/Footer";
import ProtectedRoute from "@features/auth/components/ProtectedRoute";
import LoginPage from "@features/auth/pages/LoginPage";
import MultiProjectView from "@pages/MultiProjectView";
import { listProjects } from "@api";

/** Garde: garantit une URL projet valide, sinon redirige vers le 1er projet. */
function ProjectsGate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const projects = await listProjects();
        if (cancel) return;

        // Aucun projet -> laisser la vue gérer l'état vide
        if (!projects || projects.length === 0) {
          setReady(true);
          return;
        }

        const wanted = id ? Number(id) : NaN;
        const exists = Number.isFinite(wanted) && projects.some(p => p.id === wanted);

        // Pas d'ID ou ID invalide -> vers le 1er projet
        if (!exists) {
          navigate(`/projects/${projects[0].id}`, { replace: true });
          return;
        }

        setReady(true);
      } catch {
        // Erreur API -> rendre quand même pour que la vue affiche l'erreur
        setReady(true);
      }
    })();

    return () => { cancel = true; };
  }, [id, navigate]);

  if (!ready) return null;
  return (
    <ProtectedRoute required>
      <MultiProjectView />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage initialMode="signup" />} />

            {/* Projets */}
            <Route path="/projects" element={<ProjectsGate />} />
            <Route path="/projects/:id" element={<ProjectsGate />} />

            {/* Accueil & fallback */}
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
