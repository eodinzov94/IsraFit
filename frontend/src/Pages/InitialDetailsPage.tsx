import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Avatar from "@mui/material/Avatar";
import {z} from "zod";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import Button from "@mui/material/Button";
import {Stack, Switch} from "@mui/material";
import {ChangeEvent} from "react";

export default function InitialDetailsPage() {
    const DetailsSchema = z.object({
        firstName: z
            .string({required_error: "Please enter your first name"})
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long"),
        lastName: z
            .string({required_error: "Please enter your last name"})
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long"),
        weight: z.number({required_error: "Please enter your weight"})
            .gte(35, "You must be at least 35kg")
            .lte(250, "You must be at most 250kg"),
        height: z.number({required_error: "Please enter your height"})
            .gte(120, "You must be at least 120cm")
            .lte(250, "You must be at most 250cm"),
        gender: z.string(),

    });
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            weight: 35,
            height: 120,
            gender: 'Male',
        },
        validationSchema: toFormikValidationSchema(DetailsSchema),
        onSubmit: values => {
            // TODO
            console.log(values);
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('gender', e.target.checked ? 'Male' : 'Female')
    }
    return (
        //TODO:Stepper between this form, and goal set
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: '20px',
                    marginTop: 8,
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <WavingHandIcon/>
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    Welcome to IsraFit!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    To get the best results from our app, we need some info about you:
                </Typography>
                <Grid component="form" onSubmit={formik.handleSubmit} container spacing={3} mt={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            fullWidth
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="weight"
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.weight}
                            error={formik.touched.weight && Boolean(formik.errors.weight)}
                            helperText={formik.touched.weight && formik.errors.weight}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="height"
                            name="height"
                            label="height (cm)"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.height}
                            error={formik.touched.height && Boolean(formik.errors.height)}
                            helperText={formik.touched.height && formik.errors.height}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Female</Typography>
                            <Switch id="gender" name="gender" defaultChecked={true}
                                    onChange={handleChange}
                                    onBlur={formik.handleBlur}
                                    color = "default"/>
                            <Typography>Male</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, color: 'white'}}
                        >
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}