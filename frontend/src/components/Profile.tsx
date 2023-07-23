import { Avatar, Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { IUser } from "../types/ApiTypes";
import BmiRangeInfo from "./BmiRangeInfo";
import EditProfile from "./EditProfile";
import { useAppSelector } from "../store/hooks";

interface ProfileProps {
    user: IUser,
    isSm: boolean
}

const Profile: FC<ProfileProps> = ({ user, isSm }) => {
    const goal = useAppSelector(state => state.userData.goal)
    const [openEdit, setOpenEdit] = useState(false);

    
    const getPhysicalActivityStatus = (numberVal: number) => {
        switch (numberVal) {
            case 1.2: return 'Not very active';
            case 1.375: return 'Somewhat active';
            case 1.725: return 'Very active';
            case 1.9: return 'Extremely active';
        }
    }
    return (
        <>
            <EditProfile open={openEdit} setOpen={setOpenEdit} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'space-between',
                justifyContent: 'space-between',
                gap: isSm ? 0 : 8
            }}>
                <Avatar sx={{ bgcolor: 'primary.main' }} variant="square">
                    {user.firstName[0].toLocaleUpperCase()}
                </Avatar>
                <Button
                    variant='contained'
                    sx={{ mb: 2, color: 'white' }}
                    onClick={() => setOpenEdit(true)}
                    id='editProfileButton'
                >
                    Edit Profile
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: isSm ? 'column' : 'row',
                gap: isSm ? 0 : 8
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'left',
                        justifyContent: 'left',
                        height: 'auto',
                        mt: 2,
                        ml: isSm ? 0 : 8
                    }}
                >
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Email:</b> {user.email}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>First Name:</b> {user.firstName}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Last Name:</b> {user.lastName}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Gender:</b> {user.gender}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Age:</b> {new Date().getFullYear() - user.birthYear}
                    </Typography>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'left',
                        justifyContent: 'left',
                        height: 'auto',
                        mt: 2,
                    }}
                >
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Height:</b> {user.height}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Weight:</b> {user.weight}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>Physical Activity:</b> {getPhysicalActivityStatus(user.physicalActivity)}
                    </Typography>
                    <Typography component="p" variant="subtitle2" align='left'>
                        <b>BMI:</b> {user.bmi}
                        <BmiRangeInfo/>
                    </Typography>
                    {goal && <Typography component="p" variant="subtitle2" align='left' color={'primary'} sx={{ mt: 2 }}>
                        <b >Weight Goal:</b> {goal.goalWeight}
                        
                    </Typography>}
                </Box>
            </Box>
        </>
    );
};

export default Profile;