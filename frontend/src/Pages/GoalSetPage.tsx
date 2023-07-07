import FlagIcon from '@mui/icons-material/Flag';
import Avatar from "@mui/material/Avatar";
import {z} from "zod";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function GoalSetPage() {
    const navigate = useNavigate()
    const location = useLocation()
    // const {weight, height, gender, TDEE} = location.state // TODO: Replace with user data from backend, or stick with location?
    const GoalSchema = z.object({
        weightGoal: z.number({required_error: "Please choose a goal!"})
            .gte(35, "You must be at least 35kg")
            .lte(250, "You must be at most 250kg"),

    });
    const formik = useFormik({
        initialValues: {
            weightGoal: 35, dateGoal: dayjs(),
        }, validationSchema: toFormikValidationSchema(GoalSchema), onSubmit: values => {
            // TODO
            console.log(values);
            navigate('/login')
        },
    });
    return (<Container component="main" maxWidth="sm">
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
                <FlagIcon/>
            </Avatar>
            <Typography variant="h6" gutterBottom>
                Ready to reach your next fitness milestone?
            </Typography>
            <Typography variant="body1" gutterBottom>
                Tell us more about what you're trying to achieve:
            </Typography>
            <Grid component="form" onSubmit={formik.handleSubmit} container spacing={3} mt={3}>
                <Grid item xs={12} container justifyContent="center">
                    <TextField
                        required
                        id="weightGoal"
                        name="weightGoal"
                        label="Your weight goal is:"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.weightGoal}
                        error={formik.touched.weightGoal && Boolean(formik.errors.weightGoal)}
                        helperText={formik.touched.weightGoal && formik.errors.weightGoal}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                        }}
                    >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        orientation='landscape'
                        disableHighlightToday
                        disablePast
                        onChange={formik.handleChange}
                        value={formik.values.dateGoal}
                    />
                    </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, color: 'white'}}
                    >
                        Ready!
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Container>);
}