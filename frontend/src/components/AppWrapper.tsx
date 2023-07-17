import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { FormControlLabel, ListItemButton, ListItemText, Switch } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout, selectAuthentication } from '../store/reducers/auth-reducer';
import { mainListItems, topListItemsGuest } from './Items';
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
interface AppWrapperProps {
    children: React.ReactNode | React.ReactNode[];
    setDarkThemeSelected: (darkThemeSelected: boolean) => void;
    darkThemeSelected: boolean;
}


const AppWrapper: FC<AppWrapperProps> = ({ children, setDarkThemeSelected, darkThemeSelected }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const { user, isLoggedIn } = useAppSelector(selectAuthentication)
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    {(isLoggedIn && user?.role !== 'Admin') &&
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>}
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'white', textAlign: 'center' }}
                    >
                        <Box component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
                            < FitnessCenterIcon />
                            {isLoggedIn ? ` Welcome, ${user?.firstName} ` : ' IsraFit '}
                            < FitnessCenterIcon sx={{ rotate: '90deg' }} />
                        </Box>
                    </Typography>
                    <List component="nav" sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        {!isLoggedIn ? topListItemsGuest :
                            <ListItemButton onClick={() => dispatch(logout())} color='secondary' sx={{ border: '1px solid white', borderRadius: '5px', width: { xs: '60px', sm: '120px' } }}    >
                                <ListItemText primary="Logout" sx={{ color: 'white', textAlign: { xs: 'none', sm: 'center' }, visibility: { xs: 'hidden', sm: 'visible' } }} />
                                <LogoutIcon color='warning' />
                            </ListItemButton>
                        }
                    </List>
                    <FormControlLabel
                        control={<Switch checked={darkThemeSelected}
                            onChange={() => setDarkThemeSelected(!darkThemeSelected)}
                            sx={{ m: 1 }}
                        />}
                        label="Dark Mode"
                        sx={{ color: 'white' }}
                    />
                </Toolbar>
            </AppBar >
            {(isLoggedIn && user?.role !== 'Admin') && <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                </List>
            </Drawer>}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box >
    );
}
export default AppWrapper