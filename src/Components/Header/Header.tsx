import { AppBar, Toolbar, Typography, Box, Button, IconButton, Stack } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, textDecoration: "none" }}>
      <AppBar position="static">
        <Toolbar>
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
          {user ? (
            <Stack direction="row" spacing={2}>
              <Button component={Link} to="/manage-meals" color="inherit" startIcon={<PersonIcon />}>
                Profile
              </Button>
              <Button color="inherit" endIcon={<LogoutIcon />}>
                Logout
              </Button>
            </Stack>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
