import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import './App.css';
import RegisterPage from './Pages/RegisterPage.tsx';
import { darkTheme, lightTheme } from './Theme/Theme.ts';
import AppWrapper from './components/AppWrapper.tsx';

function App() {
    const [darkThemeSelected, setDarkThemeSelected] = useState(false);
    return (
        <div>
        <ThemeProvider theme={darkThemeSelected ? darkTheme : lightTheme}>
            <AppWrapper setDarkThemeSelected={setDarkThemeSelected} darkThemeSelected={darkThemeSelected}>
                <RegisterPage />
            </AppWrapper>
        </ThemeProvider>
        </div>
    )
}

export default App
