import { useState } from "react";
import {
  Typography,
  CardMedia,
  Rating,
  Chip,
  Stack,
  Tooltip,
  CardActions,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, CardContent } from "@mui/material";
import { MealCardDialog } from "../MealCardDialog/MealCardDialog";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { green } from "@mui/material/colors";

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
  user?: string;
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
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ position: "relative" }} height="100%">
          <CardMedia component="img" height="194" image={props.image}></CardMedia>
          <Chip
            label={`Cooked 
                  ${numberOfTimesCooked > 1 ? numberOfTimesCooked + " times" : "once"}`}
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          />
          <CardContent sx={{ p: 1 }}>
            <Stack>
              <Stack direction="row">
                {numberOfTimesCooked >= 3 && (
                  <Tooltip title="This meal is popular">
                    <LocalFireDepartmentIcon sx={{ color: "#CF1920" }} />
                  </Tooltip>
                )}
                <Tooltip title={props.name}>
                  <Typography
                    variant="h3"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      flexGrow: "1",
                    }}
                    gutterBottom>
                    {props.name}
                  </Typography>
                </Tooltip>
                <IconButton disableRipple sx={{ p: 0 }} onClick={handleOpen}>
                  <MoreVertIcon />
                </IconButton>
              </Stack>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Last cooked: {moment(props.lastCookedDate).fromNow()}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} py={1} flexWrap="wrap" justifyContent="flex-start">
              {props.ingredients.map(ingredient => {
                return <Chip key={ingredient} label={ingredient} size="small" color="primary" />;
              })}
            </Stack>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
            <Rating name="read-only" value={props.rating} readOnly sx={{ flexGrow: 1 }} />
            {props.user && (
              <Tooltip title="Meal shared by another user">
                <Avatar sx={{ width: 32, height: 32, bgcolor: green[500] }}>BB</Avatar>
              </Tooltip>
            )}
          </CardActions>
        </Box>
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
