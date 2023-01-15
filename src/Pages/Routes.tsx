import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./Landing/Landing";
import { ManageMeals } from "./ManageMeals/ManageMeals";
import { Register } from "./LoginRegister/Register";
import { Login } from "./LoginRegister/Login";
import { useAuth } from "../Context/AuthContext";
import { Profile } from "./Profile/Profile";

export enum Pages {
  "MANAGEMEALS" = "manage-meals",
  "PROFILE" = "profile",
  "LOGIN" = "login",
  "REGISTER" = "register",
  "LANDING" = "/",
}

export enum RoutePath {
  "MANAGEMEALS" = "/manage-meals",
  "PROFILE" = "/profile",
  "REGISTER" = "/register",
  "LOGIN" = "/login",
  "LANDING" = "/",
}

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePath["LANDING"]} element={<LandingPage />} />
      <Route
        path={RoutePath["MANAGEMEALS"]}
        element={
          <ProtectedRoute>
            <ManageMeals />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutePath["PROFILE"]}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path={RoutePath["REGISTER"]} element={<Register />} />
      <Route path={RoutePath["LOGIN"]} element={<Login />} />
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
