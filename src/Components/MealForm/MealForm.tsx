import { ReactNode, useState } from "react";
import { TextField, Stack, Rating, Typography, Box, Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
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
  name: yup.string().required("Please enter a name for your meal"),
  date: yup.date().required("Enter the date you cooked this"),
  image: yup
    .mixed()
    .required("Choose a file!")
    .test("type", "Invalid type!", value => ["image/png", "image/jpeg"].includes(value.type))
    .test("size", "Too big!", value => value.size < 200000),
  ingredient: yup
    .array()
    // .required("Choose up to 10 ingredients")
    .min(1, "Please select at least 1 ingredient")
    .max(10, "Please choose only 10 ingredients"),
  // notes: yup.string().required("Are you sure you have nothing to say about this meal?"),
  notes: yup.string(),
  // rating: yup.number().required("Rate this meal"),
  rating: yup.number(),
});

export const MealForm = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [uploading, setUploading] = useState<boolean>(false);
  const { addMeal } = useMeals();
  const { ingredientCategoryList } = useGlobal();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: new Date(),
      // picture: "",
      image: { name: "", size: 0 },
      ingredients: undefined,
      rating: 0,
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log("values in submit", values);
      values.date = moment(date).format();
      if (!values.notes) {
        alert("Are you sure you dont want to add notes?");
      }
      console.log("THE FORM HAS BEEN SUBMITTED", values);
      // addMeal(values.date, values.ingredients, values.name, values.notes, values.picture, values.rating);
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
  console.log("FORM ERR", formik.errors);
  console.log("FORM VALUES", formik.values);
  console.log("FORM VALUES", formik.values.image.name);

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
        <Stack direction="row" justifyContent="flexStart" alignItems="center" spacing={1}>
          <Button variant="contained" component="label">
            Choose Picture
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              name="image"
              onChange={e => {
                if (!e.target.files) return;
                setUploading(true);
                console.log("e?.target?.files", e?.target?.files);
                formik.setFieldValue("image", e?.target?.files[0] ?? "");
                setUploading(false);
              }}
            />
          </Button>
          {formik.values.image && !formik.errors.image && <Typography>{formik.values.image.name}</Typography>}
          {!formik.values.image && !formik.touched.image && <Typography>No picture choosen</Typography>}
          {Boolean(formik.errors.image) && (
            <Typography color="red">{formik.errors.image as ReactNode}</Typography>
          )}
        </Stack>

        <Autocomplete
          multiple
          onChange={(_, value) => {
            formik.setFieldValue(
              "ingredients",
              value.map(value => value.label)
            );
          }}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={ingredientOptions ?? []}
          getOptionLabel={ingredient => ingredient.label}
          groupBy={ingredient => ingredient.category}
          renderInput={params => (
            <TextField
              {...params}
              error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
              helperText={formik.touched.ingredients && formik.errors.ingredients}
              label="Ingredients"
            />
          )}
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
