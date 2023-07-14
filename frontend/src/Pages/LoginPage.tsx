import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, LinearProgress, Snackbar } from '@mui/material';
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
import { useLoginMutation } from '../store/reducers/api-reducer';
import { isErrorWithDataAndMessage } from '../helpers/helpers';

export default function LoginPage() {
    const [loginUser, { error, isLoading, isError }] = useLoginMutation()
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
            loginUser(values);
        },
    });


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={isError} autoHideDuration={7000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert  severity="error" sx={{ width: '100%' }}>
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
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
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
                        sx={{ mt: 3, mb: 2, color: 'white' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}