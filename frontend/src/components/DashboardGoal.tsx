import { Divider, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import dayjs from 'dayjs';


const DashboardGoal = () => {
    const goal = useAppSelector(state => state.userData.goal)
    return (
        <div>
            {goal ? (
                <>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom align='center'>
                        Current Goal
                    </Typography>
                    <Typography component="p" variant="h4" align='center'>
                        {goal.recommendedCalories.toFixed(0)}
                    </Typography>
                    <Typography align='center' sx={{mb: 1}}>
                        Calories Per day
                    </Typography>
                    <Divider />
                    <Typography align='center' sx={{mt: 1}}>
                        Weight target <b>{goal.goalWeight}</b>(kg)
                    </Typography>
                    <Typography component="p" variant="subtitle2" color='limegreen' align='right' sx={{mt: 1}}>
                        {`${dayjs(goal.endDate).diff(dayjs(), 'days')} days left`}
                    </Typography>
                </>
            ) :
                <Typography component="h2" variant="h6" color="primary" gutterBottom align='center'>
                    No goal set.
                </Typography>
            }

        </div>
    );
};

export default DashboardGoal;