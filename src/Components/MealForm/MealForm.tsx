import { useState } from "react";
import {
  TextField,
  Stack,
  Rating,
  FormControl,
  Typography,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Box,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Enter a name for your meal"),
  //   date: yup.date().required("Enter the date you cooked this"),
//   picture: yup.string().typeError("Pleas enter a link for your image"),
  //   ingredient: yup.string(),
//   notes: yup.string().required("Are you sure you have nothing to say about this meal?"),
  //   rating: yup.number().required("Rate this meal"),
});

export const MealForm = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());

  const theme = useTheme();
  const largeScreens = useMediaQuery(theme.breakpoints.up("lg"));

  const AddIndredient = (e: any) => {
    if (ingredient) {
      let tempIngredients = [...ingredients];
      if (tempIngredients) {
        tempIngredients?.push(ingredient);
      } else {
        tempIngredients = [ingredient];
      }
      setIngredients(tempIngredients);
      setIngredient("");
    }
  };

  const RemoveIngredient = (ingredientToRemove: string) => {
    const tempIngredients = [...ingredients];
    setIngredients(tempIngredients?.filter(ingredient => ingredient !== ingredientToRemove));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Formik
        initialValues={{
          name: "",
          date: "",
          picture: "",
          ingredients: [],
          notes: "",
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}>
        <Form id="meal-form">
          <Stack spacing={2}>
            <Field name="firstName">
              {({ field, form, meta }: any) => (
                <TextField
                  fullWidth
                  label="Meal name"
                  name="name"
                  variant="outlined"
                  // value={formik.values.name}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && formik.errors.name}
                  // onChange={formik.handleChange}
                />
              )}
            </Field>

            {largeScreens ? (
              <DesktopDatePicker
                disableFuture
                label="Date"
                inputFormat="dddd M/D/Y"
                value={new Date()}
                onChange={value => setDate(value)}
                renderInput={params => <TextField {...params} />}
              />
            ) : (
              <MobileDatePicker
                disableFuture
                label="Date"
                inputFormat="dddd M/D/Y"
                value={new Date()}
                onChange={value => setDate(value)}
                renderInput={params => <TextField {...params} />}
              />
            )}
            <TextField
              label="Picture"
              name="picture"
              //   onChange={formik.handleChange}
              //   value={formik.values.picture}
              //   error={formik.touched.picture && Boolean(formik.errors.picture)}
              //   helperText={formik.touched.picture && formik.errors.picture}
              variant="outlined"
            />
            <FormControl>
              <InputLabel>Ingrediets</InputLabel>
              <OutlinedInput
                label="Ingrediets"
                value={ingredient}
                onChange={e => setIngredient(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={AddIndredient}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {ingredients &&
              ingredients?.length > 0 &&
              ingredients.map(ingredient => {
                return (
                  <List key={ingredient}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <IconButton onClick={() => RemoveIngredient(ingredient)}>
                          <DeleteIcon />
                        </IconButton>
                      }>
                      <ListItemText sx={{ ml: 1 }}>{ingredient}</ListItemText>
                    </ListItem>
                  </List>
                );
              })}
            <TextField
              label="Notes"
              name="notes"
              //   value={formik.values.notes}
              //   onChange={formik.handleChange}
              //   error={formik.touched.notes && Boolean(formik.errors.notes)}
              //   helperText={formik.touched.notes && formik.errors.notes}
              multiline
              variant="outlined"
            />
            <Stack spacing={0.5}>
              <Typography
                component="legend"
                fontSize="1rem"
                sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: ".9rem" }}>
                Rating
              </Typography>
              <Rating />
            </Stack>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
