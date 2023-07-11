import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, FormControlLabel, FormLabel, Grid, LinearProgress, MenuItem, Radio, RadioGroup, Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRegisterMutation } from '../store/reducers/api-reducer';
import { isErrorWithDataAndMessage } from '../helpers/helpers';
import dayjs from "dayjs";

export default function RegisterPage() {
    const [registerUser, { error, isLoading, isError }] = useRegisterMutation()
    const RegisterSchema = z.object({
        email: z
            .string({ required_error: "Please enter your email" })
            .email("This is not a valid email."),
        password: z
            .string({ required_error: "Please enter your password" }),
        confirmPassword: z.string({ required_error: "Please confirm your password" }),
        gender: z.enum(['Female', 'Male']),
        firstName: z
            .string({ required_error: "Please enter your first name" })
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long"),
        lastName: z
            .string({ required_error: "Please enter your last name" })
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long"),
        weight: z.number({ required_error: "Please enter your weight" })
            .gte(35, "You cannot be under 35kg!")
            .lte(250, "You must be at most 250kg!"),
        height: z.number({ required_error: "Please enter your height" })
            .gte(120, "You cannot be under 120cm")
            .lte(250, "You cannot be over 250cm"),
        physicalActivity: z.number({ required_error: "Please choose a physical activity level" }),
        birthYear: z.number({ required_error: "Please enter your age" })
            .lte(new Date().getFullYear()-18, "You must be at least 18 years old")
            .gte(new Date().getFullYear()-100, "You, sadly, must be at most 100 years old")
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            birthYear: dayjs().year() - 18,
            gender: 'Male',
            weight: 35,
            height: 120,
            firstName: '',
            lastName: '',
            physicalActivity: 1.2,
            TDEE: 0
        },
        validationSchema: toFormikValidationSchema(RegisterSchema),
        onSubmit: values => {
            const BMR = (10 * values.weight + 6.25 * values.height - 5 * (dayjs().year() -values.birthYear)) + (values.gender === 'Male' ? 5 : -161); //formula
            values.TDEE = BMR * values.physicalActivity; //total daily energy expenditure formula
            registerUser({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                birthYear: Number(values.birthYear),
                height: Number(values.height),
                gender: values.gender as 'Female' | 'Male',
                physicalActivity: Number(values.physicalActivity),
                weight: Number(values.weight),
                TDEE: values.TDEE
            });
        },
    });


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={isError} autoHideDuration={7000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {isErrorWithDataAndMessage(error) && error.data.message || 'Something went wrong'}
                </Alert>
            </Snackbar>
            {isLoading && <LinearProgress />}
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin='normal'
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                name="firstName"
                                type="text"
                                inputProps={{ style: { textTransform: 'lowercase' } }}
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
                                inputProps={{ style: { textTransform: 'lowercase' } }}
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
                        <Grid item xs={12}>
                            <TextField
                                margin='normal'
                                fullWidth
                                variant="outlined"
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                inputProps={{ style: { textTransform: 'lowercase' } }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
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
                                name="password"
                                label="Password"
                                type="password"
                                inputProps={{ style: { textTransform: 'lowercase' } }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                inputProps={{ style: { textTransform: 'lowercase' } }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant="outlined"
                                name="weight"
                                label="Weight (kg)"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.weight}
                                error={formik.touched.weight && Boolean(formik.errors.weight)}
                                helperText={formik.touched.weight && formik.errors.weight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, color: 'white' }}>
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}