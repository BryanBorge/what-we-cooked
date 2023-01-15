import React from "react";
import { useAuth } from "../../Context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { useNavigate } from "react-router-dom";
import { Pages, RoutePath } from "../../Pages/Routes";

export type NavigationItem = {
  text: string;
  path: string;
  slug?: string;
  icon?: React.ReactNode;
  authRequired?: boolean;
  onClick: () => void;
};

export const useHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const NavigationItems: Array<NavigationItem> = [
    {
      text: "Manage Meals",
      path: RoutePath.MANAGEMEALS,
      slug: Pages.MANAGEMEALS,
      icon: <DinnerDiningIcon />,
      authRequired: true,
      onClick: () => navigate(RoutePath.MANAGEMEALS),
    },
    {
      text: "Profile",
      path: RoutePath.PROFILE,
      slug: Pages.PROFILE,
      icon: <PersonIcon />,
      authRequired: true,
      onClick: () => navigate(RoutePath.PROFILE),
    },
    {
      text: "Login",
      path: RoutePath.LOGIN,
      slug: Pages.LOGIN,
      authRequired: false,
      onClick: () => navigate(RoutePath.LOGIN),
    },
    {
      text: "Register",
      path: RoutePath.REGISTER,
      slug: Pages.REGISTER,
      authRequired: false,
      onClick: () => navigate(RoutePath.REGISTER),
    },
  ];

  return {
    user,
    logout,
    navigationItems: NavigationItems.filter(navItem => {
      //Don show un-auth routes if we have a user
      if (user) {
        return navItem.authRequired === true;
      } else {
        return navItem.authRequired === false;
      }
    }),
  };
};
