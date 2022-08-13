import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { RegisterForm } from "../../Components/LoginRegisterForms/RegisterForm";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/manage-meals`);
    }
  }, []);

  return (
    <Container maxWidth="xs">
      <RegisterForm />
    </Container>
  );
};
