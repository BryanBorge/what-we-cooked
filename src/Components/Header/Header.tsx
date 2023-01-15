import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useHeader } from "./useHeader";
import { MainDrawer } from "../Drawer/MainDrawer";

export const Header = () => {
  const { user, logout, navigationItems } = useHeader();
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const tabletAndSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box sx={{ flexGrow: 1, textDecoration: "none" }}>
        <AppBar position="static">
          <Toolbar>
            {tabletAndSmaller ? (
              <Box sx={{ flexGrow: 1 }}>
                <IconButton size="large" edge="start" color="inherit" onClick={() => setOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  component={Link}
                  to="/"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple>
                  <RestaurantMenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  What We Cooked
                </Typography>
              </>
            )}

            {user && !tabletAndSmaller && (
              <Stack direction="row" spacing={2}>
                {navigationItems.map(item => (
                  <Button component={Link} to={item.path} color="inherit" startIcon={item?.icon}>
                    {item.text}
                  </Button>
                ))}
                <Button color="inherit" endIcon={<LogoutIcon />} onClick={() => logout()}>
                  Logout
                </Button>
              </Stack>
            )}
            {user && tabletAndSmaller && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  component={Link}
                  to="/"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple>
                  <RestaurantMenuIcon />
                </IconButton>
              </>
            )}

            {!user && (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <MainDrawer open={open} onClose={() => setOpen(false)} navigationItems={navigationItems} />
    </>
  );
};
