import { createTheme, ThemeProvider } from "@mui/material";

export const BrandingProvider = ({ children }: any) => {
  const palette = {
    common: {
      white: "#fffff",
    },
    primary: {
      main: "#4A6274",
    },
    secondary: {
      main: "#79AEB2",
    },
    success: {
      main: "#5CBC64",
    },
    lightGray: {
      500: "#F9F9F9",
    },
  };

  const theme = createTheme({
    palette: {
      ...palette,
      background: {
        paper: palette.lightGray[500],
      },
    },
    typography: {
      fontFamily: "Poppins",
      h1: {
        fontSize: "2rem", //32pt
      },
      h2: {
        fontSize: "1.5rem",
      },
      h3: {
        fontSize: "1.17rem", //18.72pt
      },
      h4: {
        fontSize: "1.06rem", //17pt
      },
      h5: {
        fontSize: "1rem", //16pt
      },
      h6: {
        fontSize: "0.83rem", //13.28pt
      },
      subtitle1: {
        fontSize: "1.06rem", //17pt
      },
      subtitle2: {
        fontSize: "0.94rem", //15pt
      },
      body1: {
        fontSize: "1rem", //15pt
      },
      body2: {
        fontSize: "0.94rem", //15pt
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.lightGray[500],
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: palette.primary.main,
            backgroundColor: palette.lightGray[500]
          }
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
