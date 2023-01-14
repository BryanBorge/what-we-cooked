import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { Response } from "./AuthContext";

type Pagination = {
  next?: number;
  previous?: number;
  limit?: number;
};

type IngredientCategoryList = {
  category: string;
  ingredientList: [string];
  slug: string;
  sequence: number;
};

interface GetIngredientResponse extends Response {
  data: Array<IngredientCategoryList>;
  pagination: Pagination;
  count: number;
}

type GlobalContext = {
  ingredientCategoryList?: Array<IngredientCategoryList>;
  getIngredients: () => void;
  error?: string;
  loading: boolean;
};

export const creds = {
  ApiBaseUrl: "http://localhost:5000/api/v1",
};

const globalContext = createContext<GlobalContext>({
  getIngredients() {},
  error: "",
  loading: false,
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideGlobalContext({ children }: any) {
  const globalState = useProvideGlobal();
  return <globalContext.Provider value={globalState}>{children}</globalContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useGlobal = () => {
  return useContext(globalContext);
};

// Provider hook that creates auth object and handles state
const useProvideGlobal = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredientCategoryList, setIngredientCategoryList] = useState<
    undefined | Array<IngredientCategoryList>
  >();

  const getIngredients = () => {
    setError(undefined);
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/ingredients?limit=100`)
      .then(response => {
        const { data }: { data: GetIngredientResponse } = response;

        if (!data.success) {
          console.log("Something went wrong", data);
        }

        const sortedIngredients = data.data
          .map(ingredientCategoryList => {
            return {
              category: ingredientCategoryList.category,
              ingredientList: ingredientCategoryList.ingredientList,
              slug: ingredientCategoryList.slug,
              sequence: ingredientCategoryList.sequence ?? 100,
            };
          })
          .sort((a, b) => a.sequence - b.sequence);

        setIngredientCategoryList(sortedIngredients);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setLoading(false);
      });
  };

  return {
    error,
    loading,
    ingredientCategoryList,
    getIngredients,
  };
};
