import React from "react";
import { MealCard } from "./Components/MealCard/MealCard";
import { data } from "./mealData";
import { Box, Grid } from "@mui/material";
import { BrandingProvider } from "./Components/BrandingProvider/BrandingProvider";
import { ContentLayout } from "./Components/ContentLayout";

function App() {
  return (
    <BrandingProvider>
      <ContentLayout />
    </BrandingProvider>
  );
}

export default App;
