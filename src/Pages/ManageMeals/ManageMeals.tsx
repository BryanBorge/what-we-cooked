import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { MealFormDialog } from "../../Components/MealForm/MealFormDialog";

const useManageMeals = () => {
  const [mealFormDialogOpen, setMealFormDialogOpen] = useState(false);

  return {
    open: mealFormDialogOpen,
    handleOpen: () => setMealFormDialogOpen(true),
    handleClose: () => setMealFormDialogOpen(false),
  };
};

export const ManageMeals = () => {
  const { open, handleOpen, handleClose } = useManageMeals();

  return (
    <Box>
      <Fab
        variant="extended"
        sx={{ margin: 0, top: "auto", right: 20, bottom: 20, left: "auto", position: "fixed" }}
        onClick={handleOpen}>
        <RestaurantIcon sx={{ mr: 1 }} />
        Add meal
      </Fab>
      <MealFormDialog title="Add a new meal" open={open} onClose={handleClose} />
    </Box>
  );
};
