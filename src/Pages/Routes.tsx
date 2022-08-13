import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./Landing/Landing";
import { ManageMeals } from "./ManageMeals/ManageMeals";
import { Register } from "./LoginRegister/Register";
import { Login } from "./LoginRegister/Login";
import { useAuth } from "../Context/AuthContext";

export const MainRoutes = (props: any) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/manage-meals"
        element={
          <ProtectedRoute>
            <ManageMeals />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

// A wrapper for the element prop that redirects to the landing
// screen if you're not yet authenticated.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
