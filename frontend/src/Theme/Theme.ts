import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4caf50', // A vibrant green color
        },
        secondary: {
            main: '#ca6a4d', // A deep orange color
        },
        background: {
            default: '#fafafa', // light gray background
        },
        
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#46b144', // A lighter green color
        },
        secondary: {
            main: '#ff9e80', // A lighter orange color
        },
        background: {
            default: '#303030', // dark gray background
        },
    }
});

export { lightTheme, darkTheme };
