import { ReactNode, useState } from "react";
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
import * as yup from "yup";
import moment from "moment";
import { useMeals } from "../../Context/MealContext";
import Autocomplete from "@mui/material/Autocomplete";
import { useGlobal } from "../../Context/GlobalContext";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const validationSchema = yup.object({
  // name: yup.string().required("Enter a name for your meal"),
  name: yup.string(),
  // date: yup.date().required("Enter the date you cooked this"),
  date: yup.date(),
  picture: yup.string().typeError("Pleas enter a link for your image"),
  ingredient: yup.array(),
  // notes: yup.string().required("Are you sure you have nothing to say about this meal?"),
  notes: yup.string(),
  // rating: yup.number().required("Rate this meal"),
  rating: yup.number(),
});

export const MealForm = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const { addMeal } = useMeals();
  const { ingredientCategoryList } = useGlobal();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: new Date(),
      picture: "",
      ingredients: [],
      rating: 0,
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log("values in submit", values);
      values.date = moment(date).format();
      console.log("THE FORM HAS BEEN SUBMITTED", values);
      addMeal(values.date, values.ingredients, values.name, values.notes, values.picture, values.rating);
    },
  });

  const theme = useTheme();
  const largeScreens = useMediaQuery(theme.breakpoints.up("lg"));

  const ingredientOptions = ingredientCategoryList?.flatMap(ingCat =>
    ingCat.ingredientList.map(ing => {
      return { label: ing, category: ingCat.category };
    })
  );

  // console.log("ingredients", ingredients);
  console.log("FORM VALUES", formik.values);

  return (
    <Box component="form" id="meal-form" noValidate sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Meal name"
          name="name"
          variant="outlined"
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
        />

        {largeScreens ? (
          <DesktopDatePicker
            disableFuture
            label="Date"
            // name="date"
            inputFormat="dddd M/D/Y"
            value={formik.values.date}
            onChange={value => setDate(value)}
            renderInput={params => (
              <TextField
                name="date"
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && (formik.errors.date as ReactNode)}
                {...params}
              />
            )}
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
          onChange={formik.handleChange}
          value={formik.values.picture}
          error={formik.touched.picture && Boolean(formik.errors.picture)}
          helperText={formik.touched.picture && formik.errors.picture}
          variant="outlined"
        />

        <Autocomplete
          multiple
          onChange={(_, value) => {
            console.log("SELECTED VALUE", value);
            formik.setFieldValue(
              "ingredients",
              value.map(value => value.label)
            );
          }}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={ingredientOptions ?? []}
          getOptionLabel={ingredient => ingredient.label}
          groupBy={ingredient => ingredient.category}
          renderInput={params => <TextField {...params} label="Ingredients" />}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.label, inputValue, { insideWords: true });
            const parts = parse(option.label, matches);

            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
          multiline
          rows={10}
          variant="outlined"
        />
        <Stack spacing={0.5}>
          <Typography
            component="legend"
            fontSize="1rem"
            sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: ".9rem" }}>
            Rating
          </Typography>
          <Rating name="rating" onChange={formik.handleChange} value={formik.values.rating as number} />
        </Stack>
      </Stack>
    </Box>
  );
};
