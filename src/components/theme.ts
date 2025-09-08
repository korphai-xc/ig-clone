import { createTheme } from "@mui/material/styles";

// Augment the palette to include a custom color
declare module "@mui/material/styles" {
  interface Palette {
    like: Palette["primary"];
  }

  interface PaletteOptions {
    like?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a",
      paper: "#171717",
    },
    text: {
      primary: "#ededed",
      secondary: "#a3a3a3",
    },
    like: {
      main: "rgba(252, 70, 158, 1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        body {
          background-color: ${themeParam.palette.background.default};
          color: ${themeParam.palette.text.primary};
        }
      `,
    },
  },
});

export default theme;
