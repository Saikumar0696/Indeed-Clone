import { createTheme } from "@material-ui/core";

export default createTheme({
  palette: {
    primary: {
      main: "#2557a7",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    h6: {
      fontSize: 14,
    },
    h5: {
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiRadio: {
      root: {
        color: "black",
      },
      colorSecondary: {
        "&$checked": {
          color: "black",
        },
      },
    },
  },
});
