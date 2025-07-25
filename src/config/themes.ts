// theme.ts

import { extendTheme } from "@chakra-ui/react";

// Definir los colores personalizados basados en #aa8203
const colors = {
  customYellow: {
    50: "#f5e6a9",  // Color claro (50%)
    100: "#e1cc6a", // Color para 100%
    200: "#ccad2b", // Color para 200%
    300: "#b78f03", // Color para 300%
    400: "#a87b03", // Color para 400%
    500: "#aa8203", // Color base (500%)
    600: "#8a6902", // Color para 600%
    700: "#6a4e02", // Color para 700%
    800: "#4b3301", // Color para 800%
    900: "#2d1901", // Color oscuro (900%)
  },
};

// Extiende el tema y agrega el nuevo colorScheme
const theme = extendTheme({
  colors,
});

export default theme;
