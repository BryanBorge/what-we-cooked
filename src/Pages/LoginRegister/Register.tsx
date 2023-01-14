import { useEffect } from "react";
import Box from "@mui/material/Box";
import { RegisterForm } from "../../Components/LoginRegisterForms/RegisterForm";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/profile`);
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" alignContent="center">
      <Box maxWidth="sm">
        <RegisterForm />
      </Box>
    </Box>
  );
};
