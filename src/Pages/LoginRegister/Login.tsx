import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { LoginForm } from "../../Components/LoginRegisterForms/LoginForm";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("user in login", user);

  useEffect(() => {
    if (user) {
      navigate(`/profile`);
    }
  });

  return (
    <Container maxWidth="xs">
      <LoginForm />
    </Container>
  );
};
