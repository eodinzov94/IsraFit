import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
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

export default function RegisterPage() {
    const RegisterSchema = z.object({
        email: z
            .string({ required_error: "Please enter your email" })
            .email("This is not a valid email."),
        password: z
            .string({ required_error: "Please enter your password" }),
        confirmPassword: z.string({ required_error: "Please confirm your password" }),
        birthYear: z.number(),
        height: z.number(),
        firstName: z.string(),
        lastName: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            birthYear: '',
            gender: 'F',
            height: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: toFormikValidationSchema(RegisterSchema),
        onSubmit: values => {
            // Handle Submit
            console.log(values);
        },
    });


    return (
        <Container component="main" maxWidth="xs">
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
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            name='gender'
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="F" control={<Radio />} label="Female" />
                            <FormControlLabel value="M" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,color: 'white'}}>
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}