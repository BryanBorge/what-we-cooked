import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  Typography,
  Rating,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MealHistory } from "../MealCard/MealCard";

interface MealCardDialogProps {
  name: string;
  open: boolean;
  lastCookedDate: string;
  rating: number;
  description: string;
  history: MealHistory[];
  image: string;
  ingredients: string[];
  onClose: () => void;
}

const useMealCardDialog = (mealDates: any[]) => {
  return {
    sortedMealDates: [...mealDates].reverse(),
    mostRecentMealDate: [...mealDates].reverse()[0],
  };
};

export const MealCardDialog = (props: MealCardDialogProps) => {
  const { sortedMealDates, mostRecentMealDate } = useMealCardDialog(props.history);
  const numberOfTimesCooked = props.history.length;

  return (
    <Dialog open={props.open} onClose={props.onClose} sx={{ minWidth: "300px", width: "100%" }}>
      <DialogTitle>
        <Stack direction="column">
          <Stack direction="row">
            {numberOfTimesCooked >= 3 && (
              <Tooltip title="This meal is popular">
                <LocalFireDepartmentIcon sx={{ color: "#CF1920" }} />
              </Tooltip>
            )}
            <Typography variant="h3" pb={1}>
              {props.name}
            </Typography>
          </Stack>
          <Rating name="read-only" value={props.rating} readOnly />
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" pb={4}>
          <Box sx={{ maxHeight: "320px", overflow: "hidden" }} pb={4}>
            <img
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "320px",
                objectFit: "contain",
                objectPosition: "center center",
              }}
              src={props.image}
            />
          </Box>
          {/* Needs a slider so we can get rid of the overflow hidden */}
          <Stack direction="row" spacing={1} py={1} pb={4} sx={{ overflow: "hidden" }}>
            {props.ingredients.map(ingredient => {
              return <Chip label={ingredient} size="small" color="primary" />;
            })}
          </Stack>
          <Typography variant="body1" gutterBottom>
            {sortedMealDates?.length > 1 ? "Last cooked on " : "First cooked on "}
            {mostRecentMealDate.date}
          </Typography>
          <Typography variant="body2">{mostRecentMealDate.notes}</Typography>
        </Box>
        {sortedMealDates?.length > 1 && (
          <Typography variant="h4" gutterBottom>
            Meal History
          </Typography>
        )}
        {/* Dont show most recent date in this list. Most recent date will be main pic on dialog */}
        {sortedMealDates.slice(1).map(date => {
          return (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                <Typography variant="h5">{date.date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{date.notes}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Stack>
          <Button color="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
