import React, { useEffect, useState } from "react";
import { Box, Container, Fab, Typography, Grid } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { MealFormDialog } from "../../Components/MealForm/MealFormDialog";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMeals } from "../../Context/MealContext";
import axios from "axios";
import { MealCard } from "../../Components/MealCard/MealCard";

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
  const { getMealsForUser, loading, error, userMeals } = useMeals();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
  });

  useEffect(() => {
    getMealsForUser();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h1" color="primary" align="center">
          Your Meals
        </Typography>

        <Grid container spacing={2} sx={{ pt: 5 }} justifyContent="center">
          {userMeals?.map((meal: any) => (
            <Grid item xs={12} sm={6} md={4} key={meal.name}>
              <MealCard
                name={meal.name}
                rating={meal.averageRating}
                lastCookedDate={meal.mealDate}
                image={meal.photo}
                description={meal.description}
                history={meal.mealHistory}
                ingredients={meal.ingredients}
              />
            </Grid>
          ))}
        </Grid>

        <Fab
          variant="extended"
          sx={{ margin: 0, top: "auto", right: 20, bottom: 20, left: "auto", position: "fixed" }}
          onClick={handleOpen}>
          <RestaurantIcon sx={{ mr: 1 }} />
          Add meal
        </Fab>
        <MealFormDialog title="Add a new meal" open={open} onClose={handleClose} />
      </Box>
    </Box>
  );
};
