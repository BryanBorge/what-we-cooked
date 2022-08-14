import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { RegisterForm } from "../../Components/LoginRegisterForms/RegisterForm";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("user in register", user);

  useEffect(() => {
    if (user) {
      navigate(`/profile`);
    }
  });

  return (
    <Container maxWidth="xs">
      <RegisterForm />
    </Container>
  );
};
