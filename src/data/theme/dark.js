const theme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#b660e0",
    },
    secondary: {
      main: "#0ca975",
    },
    background: {
      default: "#313131",
      paper: "#18191a",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(255, 255, 255, 0.05)",
    "0px 2px 4px rgba(255, 255, 255, 0.1)",
    "0px 3px 6px rgba(255, 255, 255, 0.1)",
    "0px 4px 8px rgba(255, 255, 255, 0.1)",
    "0px 5px 10px rgba(255, 255, 255, 0.1)",
    "3px 6px 10px rgba(255, 255, 255, 0.1)",
    "2px 7px 15px rgba(255, 255, 255, 0.2)",
    "4px 9px 20px rgba(255, 255, 255, 0.2)",
    "5px 12px 25px rgba(255, 255, 255, 0.2)",
    "6px 15px 30px rgba(255, 255, 255, 0.2)",
    "10px 15px 35px rgba(255, 255, 255, 0.2)",
    "12px 16px 40px rgba(255, 255, 255, 0.2)",
    "14px 17px 45px rgba(255, 255, 255, 0.2)",
    "16px 18px 50px rgba(255, 255, 255, 0.2)",
    ...Array(12).fill("none"),
  ],
}

export default theme
