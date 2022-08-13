import { Typography, Box, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Thanks for cooking with us!
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://www.bryanborgesano.com/">
          Bryan Borgesano
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
