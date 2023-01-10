import { Typography, Box, TextField, Grid } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" alignContent="center">
      <Box maxWidth="sm">
        <Typography variant="h1" color="primary" align="center">
          Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={user?.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="lastName" fullWidth id="lastName" label="Last Name" value={user?.lastName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id="email" label="Email Address" name="email" value={user?.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id="phone" label="Phone Number" name="phone" value={"(555) 555-5555"} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
