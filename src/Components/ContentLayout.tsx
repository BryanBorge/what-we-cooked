import React from "react";
import { Container } from "@mui/material";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { MainRoutes } from "../Pages/Routes";
export const ContentLayout = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          pt: 8,
          pb: 6,
          minHeight: "100vh",
        }}>
        <MainRoutes />
      </Container>
      <Footer />
    </>
  );
};
