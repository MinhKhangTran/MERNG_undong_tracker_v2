import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: `"Raleway",sans-serif`,
  body: `"Oswald",sans-serif`,
};

const colors = {
  frontend: {
    50: "#f1e6ff",
    100: "#d1b8fd",
    200: "#b189f6",
    300: "#925bf1",
    400: "#732dec",
    500: "#5a13d2",
    600: "#460ea5",
    700: "#320a77",
    800: "#1e0449",
    900: "#0c001d",
  },
  backend: {
    50: "#f6fbe0",
    100: "#e4f2bb",
    200: "#d3e893",
    300: "#c3df6b",
    400: "#b3d643",
    500: "#99bc29",
    600: "#77931e",
    700: "#546913",
    800: "#323f08",
    900: "#0f1600",
  },
};

export const theme = extendTheme({
  fonts,
  colors,
});
