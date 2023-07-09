import { Box, CircularProgress, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { darkTheme, lightTheme } from "./Theme/Theme";
import AppWrapper from "./components/AppWrapper";
import { AppRouter } from "./routes/AppRouter";
import { useAuthMeQuery } from "./store/reducers/api-reducer";
function App() {
  const savedThemeSelected = localStorage.getItem("darkTheme") || "0";
  const [darkThemeSelected, setDarkThemeSelected] = useState(savedThemeSelected === "1");
  const setTheme = () => {
    if (darkThemeSelected) {
      setDarkThemeSelected(false);
      localStorage.setItem("darkTheme", "0");
    } else {
      setDarkThemeSelected(true);
      localStorage.setItem("darkTheme", "1");
    }
  }
  const token = localStorage.getItem("accessToken");
  const { isLoading } = useAuthMeQuery(null, { skip:!token});
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <CircularProgress
            color="success"
            size={100}
          />
          <Typography
            component="b"
            variant="h4"
            sx={{
              color: 'limegreen',
            }}
          >
            App is Loading ...
          </Typography>
        </Box>
      ) : (
        <ThemeProvider theme={darkThemeSelected ? darkTheme : lightTheme}>
          <AppWrapper
            setDarkThemeSelected={setTheme}
            darkThemeSelected={darkThemeSelected}
          >
            <AppRouter />
          </AppWrapper>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
