import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useAuth, creds } from "./AuthContext";

interface IMeal {
  name: string;
  date?: Date;
  description: string;
  image: string;
  ingredients: string[];
  rating: Number;
  lastCookedDate?: string;
}

interface Meal extends IMeal {
  history: {
    name?: string;
    date?: string;
    notes?: string;
    image?: string;
    ingredients?: string[];
    rating?: Number;
  }[];
}

type MealContext = {
  error?: string;
  loading: boolean;
  userMeals?: Meal[];
  allMeals?: Meal[];
  getMealsForUser: () => void;
  getAllMeals: () => void;
  addMeal: (date: any, ingredients: any, name: any, notes: any, picture: any, rating: any) => void;
};

const mealContext = createContext<MealContext>({
  error: "",
  loading: false,
  userMeals: [],
  allMeals: [],
  getMealsForUser() {},
  getAllMeals() {},
  addMeal() {},
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideMeals({ children }: any) {
  const meals = useProvideMeals();
  return <mealContext.Provider value={meals}>{children}</mealContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useMeals = () => {
  return useContext(mealContext);
};

// Provider hook that creates auth object and handles state
const useProvideMeals = () => {
  const { user } = useAuth();
  const [allMeals, setAllMeals] = useState<Meal[] | undefined>(undefined);
  const [userMeals, setUserMeals] = useState<Meal[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const userToken = localStorage.getItem("token");

  const getAllMeals = () => {
    setError(undefined);
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/v1/meals`)
      .then(response => {
        const { data } = response;

        if (!data.success) {
          console.log("Something went wrong fetching meals: ", data);
        }
        setAllMeals(data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log("ERROR IN GET MEALS: ", error);
        setLoading(false);
      });
  };

  const getMealsForUser = () => {
    setError(undefined);
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/v1/meals/mine`, {
        headers: {
          Authorization: `Bearer ${user?.token ?? userToken?.replaceAll('"', "")}`,
        },
      })
      .then(response => {
        const { data } = response;

        if (!data.success) {
          console.log("Something went wrong fetching meals: ", data);
        }
        setUserMeals(data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log("ERROR IN GET MEALS: ", error);
        setLoading(false);
      });
  };

  const addMeal = (date: any, ingredients: any, name: any, notes: any, picture: any, rating: any) => {
    setError(undefined);
    setLoading(true);

    axios
      .post(
        `${creds.ApiBaseUrl}/meals`,
        {
          date,
          ingredients,
          name: name,
          description: notes,
          photo: picture,
          averageRating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token ?? userToken?.replaceAll('"', "")}`,
          },
        }
      )
      .then(response => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setLoading(false);
      });
  };

  return { loading, error, allMeals, userMeals, getMealsForUser, getAllMeals, addMeal };
};
