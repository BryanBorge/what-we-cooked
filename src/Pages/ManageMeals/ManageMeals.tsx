import React, { useEffect, useState } from "react";
import { Box, Fab } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { MealFormDialog } from "../../Components/MealForm/MealFormDialog";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
  });

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
