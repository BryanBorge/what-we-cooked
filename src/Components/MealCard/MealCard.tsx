import React, { useState } from "react";
import { Typography, CardMedia, Rating, Chip, Stack, Tooltip, CardActions, Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { MealCardDialog } from "../MealCardDialog/MealCardDialog";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useTheme } from "@mui/material/styles";

export type MealHistory = {
  date: string;
  notes: string;
  image: string;
};

interface MealCardProps {
  name: string;
  lastCookedDate: string;
  rating: number;
  image: string;
  description: string;
  history: MealHistory[];
  ingredients: string[];
}

const useMealCard = () => {
  const [mealDialogOpen, setMealDialogOpen] = useState(false);

  return {
    open: mealDialogOpen,
    handleOpen: () => setMealDialogOpen(true),
    handleClose: () => setMealDialogOpen(false),
  };
};

export const MealCard = (props: MealCardProps) => {
  const { open, handleOpen, handleClose } = useMealCard();
  const theme = useTheme();
  const numberOfTimesCooked = props.history.length;

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: "342px" }}>
        <CardMedia component="img" height="194" image={props.image}></CardMedia>
        <CardContent sx={{ p: 1 }}>
          <Stack>
            <Stack direction="row">
              {numberOfTimesCooked >= 3 && (
                <Tooltip title="This meal is popular">
                  <LocalFireDepartmentIcon sx={{ color: "#CF1920" }} />
                </Tooltip>
              )}
              <Typography
                variant="h3"
                style={{ height: `${(theme.typography.h3.lineHeight as number) * 2}rem` }}
                gutterBottom>
                {props.name}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Cooked {numberOfTimesCooked > 1 && numberOfTimesCooked}
                {numberOfTimesCooked > 1 ? " times |" : "once |"}
              </Typography>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Last cooked: {props.lastCookedDate}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5} py={1}>
            {props.ingredients.map(ingredient => {
              return <Chip key={ingredient} label={ingredient} size="small" color="primary" />;
            })}
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <Rating sx={{ right: 30 }} name="read-only" value={props.rating} readOnly />
          <Button sx={{ left: 30, textTransform: "none" }} onClick={handleOpen}>
            See more
          </Button>
        </CardActions>
      </Card>
      <MealCardDialog
        name={props.name}
        rating={props.rating}
        lastCookedDate={props.lastCookedDate}
        description={props.description}
        open={open}
        history={props.history}
        image={props.image}
        ingredients={props.ingredients}
        onClose={handleClose}
      />
    </>
  );
};
