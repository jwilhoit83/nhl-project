import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      main: blueGrey[400],
    },
  },
  secondaryText: {
    color: blueGrey[400],
  },
});

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
