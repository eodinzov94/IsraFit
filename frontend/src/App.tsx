import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { darkTheme, lightTheme } from './Theme/Theme.ts';
import AppWrapper from './components/AppWrapper.tsx';
import { AppRouter } from './routes/AppRouter.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
    const [darkThemeSelected, setDarkThemeSelected] = useState(false);
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkThemeSelected ? darkTheme : lightTheme}>
                <AppWrapper setDarkThemeSelected={setDarkThemeSelected} darkThemeSelected={darkThemeSelected}>
                    <AppRouter />
                </AppWrapper>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
