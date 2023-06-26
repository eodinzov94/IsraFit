import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

export default function LoginPage() {
    const LoginSchema = z.object({
        email: z
            .string({ required_error: "Please enter your email" })
            .email("This is not a valid email."),
        password: z
            .string({ required_error: "Please enter your password" })

    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(LoginSchema),
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
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,color: 'white'}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}