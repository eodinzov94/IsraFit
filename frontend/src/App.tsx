import { Box, CircularProgress, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { darkTheme, lightTheme } from "./Theme/Theme";
import AppWrapper from "./components/AppWrapper";
import { AppRouter } from "./routes/AppRouter";
import { useAuthMeQuery } from "./store/reducers/api-reducer";
function App() {
  const [darkThemeSelected, setDarkThemeSelected] = useState(false);
  const { isLoading } = useAuthMeQuery(null, { skip:!!localStorage.getItem("accessToken")});
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
            setDarkThemeSelected={setDarkThemeSelected}
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
