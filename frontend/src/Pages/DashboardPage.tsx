import { Button, Container, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BmiChart from '../components/BmiChart';
import CaloriesChart from '../components/CaloriesChart';
import Profile from '../components/Profile';
import ReportDailyBmi from '../components/ReportDailyBmi';
import { RouteNames } from '../routes/routes';
import { useAppSelector } from '../store/hooks';
import { IUser } from '../types/ApiTypes';
import { useGetBmiHistoryQuery, useGetGoalQuery, useGetMealHistoryQuery } from '../store/reducers/api-reducer';
import DashboardGoal from '../components/DashboardGoal';

const DashboardPage = () => {
    const email = useAppSelector((state) => state.auth.user?.email) || '';
    useGetGoalQuery(email,{refetchOnMountOrArgChange: true})
    useGetMealHistoryQuery(email,{refetchOnMountOrArgChange: true})
    useGetBmiHistoryQuery(email,{refetchOnMountOrArgChange: true})
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user) as IUser;
    const isSm = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const [openBmiReport, setOpenBmiReport] = useState(false);
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ReportDailyBmi open={openBmiReport} setOpen={setOpenBmiReport} />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={9} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: { sm: 'auto', md: '240px' },
                        }}
                    >
                        <Profile user={user} isSm={isSm} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: '240px',
                        }}
                    >
                        <DashboardGoal />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                            height: 'auto',
                            alignContent: 'center',
                            justifyContent: 'space-around',
                            gap: 2
                        }}
                    >
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}
                            onClick={() => setOpenBmiReport(true)}
                            id='BMIButton'
                        >
                            Report
                            Daily
                            BMI
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}
                            onClick={() => navigate(RouteNames.REPORT_FOOD)}
                            id='caloriesButton'
                        >
                            Report Calories
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}
                            onClick={() => navigate(RouteNames.GOAL_SET)}
                            id='goalButton'
                        >
                            Set/Change Goal
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
                            height: { xs: 400, sm: 480, md: 700, lg: 250 },
                            alignItems: { xs: 'right', sm: 'right', md: 'right', lg: 'space-between' },
                            justifyContent: { xs: 'space-between', sm: 'space-between', md: 'space-between', lg: 'center' },
                        }}
                    >
                        <Grid item sx={{
                            alignItems: 'center', justifyContent: 'center',
                            height: { xs: 200, sm: 230, md: 350, lg: 230 },
                            width: { xs: 270, sm: 600, md: 800, lg: 500 },
                        }}>
                            <BmiChart skip={true} />
                        </Grid>
                        <Grid item sx={{
                            alignItems: 'center', justifyContent: 'center',
                            height: { xs: 200, sm: 230, md: 350, lg: 230 },
                            width: { xs: 270, sm: 600, md: 800, lg: 500 },
                        }}>
                            <CaloriesChart />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardPage;