// frontend/src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { hasSession } from "@utils/auth";

export default function ProtectedRoute({
  children,
  required = false,
}: {
  children: JSX.Element | ReactNode;
  required?: boolean;
}) {
  const location = useLocation();
  if (required && !hasSession()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
