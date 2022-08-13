import React from "react";
import { Box } from "@mui/material";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { MainRoutes } from "../Pages/Routes";
export const ContentLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}>
        <MainRoutes />
      </Box>
      <Footer />
    </>
  );
};
