import { Copyright } from '@mui/icons-material';
import { Button, Container, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import BmiChart from '../components/BmiChart';
import CaloriesChart from '../components/CaloriesChart';
import LastReports from '../components/LastReports';
import Profile from '../components/Profile';
import { useAppSelector } from '../store/hooks';
import { IUser } from '../types/ApiTypes';
import { useState } from 'react';
import ReportDailyBmi from '../components/ReportDailyBmi';

const DashboardPage = () => {
    const user = useAppSelector((state) => state.auth.user) as IUser;
    const isSm = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isMd = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const [openBmiReport, setOpenBmiReport] = useState(false);
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ReportDailyBmi open={openBmiReport} setOpen={setOpenBmiReport}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={9} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: isSm ? 'auto' : '240px',
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
                        <div>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom align='center'>
                                Current Goal
                            </Typography>
                            <Typography component="p" variant="h4" align='center'>
                                1530
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }} align='center'>
                                Calories Per day
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: isSm || isMd ? 'column' : 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                            gap: 5,
                            height: isSm ? 480 : isMd ? 700 : 240,
                        }}
                    >
                        <BmiChart />
                        <CaloriesChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '240px',
                            alignContent: 'space-between',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}
                            onClick={() => setOpenBmiReport(true)}
                        >
                            Report
                            Daily
                            BMI
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}

                        >
                            Report Calories
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ mb: 2, color: 'white' }}

                        >
                            Set/Change Goal
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align='left'>
                            Last Reports
                        </Typography>
                        <LastReports />
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
};

export default DashboardPage;