import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MealForm } from "./MealForm";
import { useGlobal } from "../../Context/GlobalContext";

interface MealFormDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export const MealFormDialog = (props: MealFormDialogProps) => {
  const { getIngredients, ingredientCategoryList, loading, error } = useGlobal();

  React.useEffect(() => {
    if (!ingredientCategoryList) {
      getIngredients();
    }
  }, []);

  const theme = useTheme();
  const tabletAndSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={props.open} fullScreen={tabletAndSmaller} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" pb={1}>
              {props.title}
            </Typography>
            <IconButton edge="end" onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <MealForm />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}>
          <Button color="primary" variant="outlined" type="submit" form="meal-form">
            Save
          </Button>
          <Button color="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
