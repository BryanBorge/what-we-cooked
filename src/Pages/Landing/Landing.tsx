import { Typography, Box, Container, Grid, Stack, Button } from "@mui/material";
import { data } from "../../mealData";
import { MealCard } from "../../Components/MealCard/MealCard";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h1" align="center" color="primary" gutterBottom>
            What We Cooked
          </Typography>
          <Typography variant="body1" align="center" color="text.primary" paragraph>
            Found a meal you enjoy cooking? Want to make it better each time? Want to share that meal with
            your friends and family? What We Cooked is the perfect place for all of this and more. Share the
            meals you've cooked and explore what others have cooked!
          </Typography>
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
        </Stack>
      </Container>
      <Container sx={{ pt: 15 }}>
        <Typography variant="h2" align="center" color="primary" gutterBottom sx={{ pb: 5}}>
          Here's a few meals cooked by other people
        </Typography>
        <Grid container spacing={2}>
          {data &&
            data.map((meal: any) => (
              <Grid item xs={12} sm={6} md={4} key={meal.name}>
                <Box sx={{ mr: 1, mb: 2 }}>
                  <MealCard
                    name={meal.name}
                    rating={meal.rating}
                    lastCookedDate={meal.lastCookedDate}
                    image={meal.image}
                    description={meal.description}
                    history={meal.history}
                    ingredients={meal.ingredients}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};
