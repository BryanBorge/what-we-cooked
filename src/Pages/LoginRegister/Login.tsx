import { useEffect } from "react";
import Box from "@mui/material/Box";
import { LoginForm } from "../../Components/LoginRegisterForms/LoginForm";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("user in login", user);

  useEffect(() => {
    if (user) {
      navigate(`/manage-meals`);
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" alignContent="center">
      <Box maxWidth="sm">
        <LoginForm />
      </Box>
    </Box>
  );
};
