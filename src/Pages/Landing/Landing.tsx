import { useEffect } from "react";
import { Typography, Box, Container, Grid, Stack, Button, Skeleton } from "@mui/material";
import { MealCard } from "../../Components/MealCard/MealCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { useMeals } from "../../Context/MealContext";

export const LandingPage = () => {
  const { user } = useAuth();
  const { allMeals, getAllMeals, loading } = useMeals();

  useEffect(() => {
    getAllMeals();
  }, []);

  if (loading) {
    return (
      <>
        <Stack alignItems="center">
          <Skeleton width="50%" height={50} />
          <Skeleton width="100%" height={225} />
        </Stack>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Skeleton width={250} height={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton width={250} height={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton width={250} height={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton width={250} height={200} />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Stack spacing={3} alignItems="center" justifyContent="center">
        <Stack spacing={1} maxWidth="md">
          <Typography variant="h1" align="center" color="primary" gutterBottom>
            What We Cooked
          </Typography>
          <Typography variant="body1" align="center" color="text.primary" paragraph>
            Found a meal you enjoy cooking? Want to make it better each time? Want to share that meal with
            your friends and family? What We Cooked is the perfect place for all of this and more. Share the
            meals you've cooked and explore what others have cooked!
          </Typography>
        </Stack>
        {!user && (
          <Stack direction="row" spacing={4} sx={{ pt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ width: "125px" }}
              component={Link}
              to="/login">
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "125px" }}
              component={Link}
              to="/register">
              Register
            </Button>
          </Stack>
        )}
      </Stack>
      <Box sx={{ pt: 10 }}>
        <Typography variant="h2" align="center" color="primary" gutterBottom sx={{ pb: 5 }}>
          Here's a few meals cooked by other people
        </Typography>
        <Grid container spacing={2}>
          {allMeals?.map((meal: any) => (
            <Grid item xs={12} sm={6} md={4} key={meal.name}>
              <Box sx={{ mr: 1, mb: 2 }}>
                <MealCard
                  name={meal.name}
                  rating={meal.averageRating}
                  lastCookedDate={meal.mealDate}
                  image={meal.photo}
                  description={meal.description}
                  history={meal.mealHistory}
                  ingredients={meal.ingredients}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
