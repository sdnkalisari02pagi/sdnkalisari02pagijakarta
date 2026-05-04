import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, loading } = useAuth(); // 🔥 ambil loading juga

  if (loading) {
    return null; // atau bisa diganti spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
