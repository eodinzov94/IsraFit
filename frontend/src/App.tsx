import { ThemeProvider } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { darkTheme, lightTheme } from "./Theme/Theme";
import AppWrapper from "./components/AppWrapper";
import { AppRouter } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [darkThemeSelected, setDarkThemeSelected] = useState(false);
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkThemeSelected ? darkTheme : lightTheme}>
        <AppWrapper
          setDarkThemeSelected={setDarkThemeSelected}
          darkThemeSelected={darkThemeSelected}
        >
          <AppRouter />
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
