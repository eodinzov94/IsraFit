import { Box, Button, Dialog, DialogActions, DialogTitle, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { FC } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppSelector } from "../store/hooks";
import { IUser } from "../types/ApiTypes";
import { useEditProfileMutation } from "../store/reducers/api-reducer";
import LoaderWithError from "./LoaderWithError";

interface EditProfileProps {
    open: boolean;
    setOpen: (open: boolean) => void;

}
const EditProfile: FC<EditProfileProps> = ({ open, setOpen }) => {
    const [editProfile, {  isError, isLoading, error}] = useEditProfileMutation();
    const closeAndRestForm = () => {
        setOpen(false);
        formik.resetForm();
    }
    const user = useAppSelector(state => state.auth.user) as IUser
    const userUpdateSchema = z.object({
        gender: z.enum(['Female', 'Male']),
        firstName: z
            .string({ required_error: "Please enter your first name" })
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long"),
        lastName: z
            .string({ required_error: "Please enter your last name" })
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long"),
        height: z.number({ required_error: "Please enter your height" })
            .gte(120, "You cannot be under 120cm")
            .lte(250, "You cannot be over 250cm"),
        physicalActivity: z.number({ required_error: "Please choose a physical activity level" }),
        birthYear: z.number({ required_error: "Please enter your age" })
            .lte(new Date().getFullYear() - 18, "You must be at least 18 years old")
            .gte(new Date().getFullYear() - 100, "You, sadly, must be at most 100 years old")
    })
    const formik = useFormik({
        initialValues: {
            birthYear: user.birthYear,
            gender: user.gender,
            height: user.height,
            firstName: user.firstName,
            lastName: user.lastName,
            physicalActivity: user.physicalActivity,
            TDEE: user.TDEE
        },
        validationSchema: toFormikValidationSchema(userUpdateSchema),
        enableReinitialize: true,
        onSubmit: values => {
            const BMR = (10 * user.weight + 6.25 * values.height - 5 * (dayjs().year() - values.birthYear)) + (values.gender === 'Male' ? 5 : -161); //formula
            values.TDEE = BMR * values.physicalActivity; //total daily energy expenditure formula
            editProfile(values).then((response: any) => {
                if(response.data.status==='OK'){
                    closeAndRestForm();
                }
                
            })
        },
    });


    return (
        <Dialog
            open={open}
            keepMounted
            onClose={closeAndRestForm}
        >
            <DialogTitle>Edit Profile</DialogTitle>
            <LoaderWithError isError={isError} error={error} isLoading={isLoading}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 400,
                    p: 2
                }}>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ alignItems: 'center', }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin='normal'
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin='normal'
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant="outlined"
                                name="birthYear"
                                label="Birth Year"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birthYear}
                                error={formik.touched.birthYear && Boolean(formik.errors.birthYear)}
                                helperText={formik.touched.birthYear && formik.errors.birthYear}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant="outlined"
                                name="height"
                                label="Height (cm)"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.height}
                                error={formik.touched.height && Boolean(formik.errors.height)}
                                helperText={formik.touched.height && formik.errors.height}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                name='gender'
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                        <TextField
                            required
                            fullWidth
                            select
                            name="physicalActivity"
                            label="Physical Activity Level"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.physicalActivity && Boolean(formik.errors.physicalActivity)}
                            helperText={formik.touched.physicalActivity && formik.errors.physicalActivity}
                            value={formik.values.physicalActivity}
                        >
                            <MenuItem value={1.2}>Not very active</MenuItem>
                            <MenuItem value={1.375}>Somewhat active</MenuItem>
                            <MenuItem value={1.725}>Very active</MenuItem>
                            <MenuItem value={1.9}>Extremely active</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                        <p>{"*** To change your weight,use 'Daily BMI Report'"}</p>
                    </Grid>
                </Box>
            </Box>
            <DialogActions>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ color: 'white' }}
                    onClick={closeAndRestForm}
                >
                    Cancel
                </Button>
                <Button
                    onClick={()=>formik.handleSubmit()}
                    fullWidth
                    variant="contained"
                    sx={{ color: 'white' }}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfile;