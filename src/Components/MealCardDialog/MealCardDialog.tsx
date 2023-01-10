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
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MealHistory } from "../MealCard/MealCard";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTabs } from "../Tabs/Tabs";
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
    mealDates: mealDates,
    mostRecentMealDate: mealDates[0],
  };
};

export const MealCardDialog = (props: MealCardDialogProps) => {
  const { mealDates, mostRecentMealDate } = useMealCardDialog(props.history);
  const theme = useTheme();
  const tabletAndSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen={tabletAndSmaller} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" pb={1} color="primary">
              {props.name}
            </Typography>
            <IconButton edge="end" onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Rating name="read-only" value={props.rating} readOnly size="small" />
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" pb={2}>
          <Box sx={{ maxHeight: "320px", overflow: "hidden" }} pb={4}>
            <img
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "320px",
                objectFit: "contain",
                objectPosition: "center center",
              }}
              alt={props.name + " image"}
              src={props.image}
            />
          </Box>
          {/* Needs a slider so we can get rid of the overflow hidden */}
          <Stack direction="row" spacing={1} py={1} pb={4} sx={{ overflow: "hidden" }}>
            {props.ingredients.map(ingredient => {
              return <Chip key={ingredient} label={ingredient} size="small" color="primary" />;
            })}
          </Stack>
          <Typography variant="h3" gutterBottom sx={{ pb: 2 }} color="primary">
            Meal History
          </Typography>
          <Typography variant="h5" gutterBottom>
            {mealDates?.length > 1 ? "Last cooked on " : "First cooked on "}
            {mostRecentMealDate?.date}
          </Typography>
          <Typography variant="body2">{mostRecentMealDate?.notes}</Typography>
        </Box>
        {mealDates?.length > 1 && (
          <Stack>
            <CustomTabs
              labels={mealDates.slice(1).map(date => date.date)}
              content={mealDates.slice(1).map(date => date.notes)}
            />
          </Stack>
        )}
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
