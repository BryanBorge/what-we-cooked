import React from "react";
import { AppBar, Toolbar, Typography, Box, Container, Grid, Link } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { MealCard } from "./MealCard/MealCard";
import { data } from "../mealData";

export const ContentLayout = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <RestaurantMenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            What We Cooked
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
            What We Cooked
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Found a meal you enjoy cooking? Want to make it better each time? Want to share that meal with your
            friends and family? What We Cooked is the perfect place for all of this and more. Share the meals
            you've cooked and explore what others have cooked!
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
          {data &&
            data.map((meal: any) => (
              <Grid item xs={12} sm={6} md={4}>
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
      <Box sx={{ p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Thanks for cooking with us!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.bryanborgesano.com/">
            Bryan Borgesano
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};
