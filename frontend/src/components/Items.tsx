
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <>
        <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/bmi-chart">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="BMI" />
        </ListItemButton>
        <ListItemButton component={Link} to='/calories-chart'>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Calories" />
        </ListItemButton>
    </>
);
export const topListItemsGuest = (
    <>
        <ListItemButton component={Link} to="/register" color='secondary' sx={{border: '1px solid white',borderRadius: '5px',width: { xs: '60px', sm: '120px' } }}    >
            <ListItemText primary="Register" sx={{ color: 'white',textAlign: { xs: 'none', sm: 'center' },visibility:{ xs: 'hidden', sm: 'visible' } }}  />
            <AppRegistrationIcon color='warning' />
        </ListItemButton>

        <ListItemButton component={Link} to="/login" color='secondary' id="navToLogin" sx={{ marginRight: '10px', border: '1px solid white',borderRadius: '5px', width: { xs: '60px', sm: '120px' }}}>
            <ListItemText primary="Login" sx={{ color: 'white',textAlign: 'center' , visibility:{ xs: 'hidden', sm: 'visible' }}}/>
            <LoginIcon color='warning' />
        </ListItemButton>
    </>
);
