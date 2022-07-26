import React, { useContext, createContext, useState, AudioHTMLAttributes } from "react";
import axios from "axios";
import { useLocalStorage } from "../Hooks/useLocalStorage";

interface Response {
  success: boolean;
  message?: string;
}

type User = {
  email?: string;
  name?: string;
  role?: "user" | "publisher" | "admin";
  token?: string;
};

interface GetUserResponse extends Response {
  user: User;
}

interface RegisterResponse extends Response {
  token: string;
}

type AuthContext = {
  user?: User;
  error?: string;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  getUser: (token: string) => void;
};

const creds = {
  ApiBaseUrl: "http://localhost:5000/api/v1",
};

const authContext = createContext<AuthContext>({
  user: {},
  error: "",
  loading: false,
  login() {},
  logout() {},
  register() {},
  getUser() {},
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setUserInLocalStoratge] = useLocalStorage<string>("token", "");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    axios
      .post(`${creds.ApiBaseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then(response => {
        setLoading(true);
        console.log(response.data);
        getUser(response.data.token);
        setUser({ ...user, token: response.data.token });
        setUserInLocalStoratge(response.data.token);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setLoading(false);
      });
  };

  const register = (name: string, email: string, password: string) => {
    axios
      .post("http://localhost:5000/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(response => {
        setLoading(true);
        const { data }: { data: RegisterResponse } = response;
        getUser(data.token);
        setUserInLocalStoratge(data.token);
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error.response.data);
        setLoading(false);
      });
  };

  const getUser = (token: string) => {
    axios
      .get(`${creds.ApiBaseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLoading(true);
        const { data }: { data: GetUserResponse } = response;
        if (!data.success) {
          console.log("Something went wrong", data);
        }

        setUser({ ...user, name: data.user.name, email: data.user.email, role: data.user.role });
        console.log(response);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error);
        setLoading(false);
      });
  };

  const logout = () => {};

  return {
    user,
    error,
    loading,
    login,
    logout,
    register,
    getUser,
  };
};
