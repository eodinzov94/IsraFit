import FlagIcon from '@mui/icons-material/Flag';
import Avatar from "@mui/material/Avatar";
import {z} from "zod";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {Box, Button, Container, CssBaseline, Divider, Grid, TextField, Typography} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function GoalSetPage() {
    const navigate = useNavigate()
    const location = useLocation()
    // const {weight, height, gender, TDEE} = location.state // TODO: Replace with user data from backend, or stick with location?
    const GoalSchema = z.object({
        weightGoal: z.number({required_error: "Please choose a goal!"})
            .gte(35, "Weighing below 35kg is not recommended")
            .lte(250, "Over 250kg as a goal is too high, try something lower!"),
        dateGoal: z.instanceof(dayjs as unknown as typeof Dayjs)
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
                Tell us more about what you're trying to achieve!
            </Typography>
            <Divider style={{width: '100%', marginTop: '20px'}}/>
            <Grid component="form" onSubmit={formik.handleSubmit} container spacing={3} mt={3}>
                <Typography variant="subtitle1" gutterBottom marginLeft="20px" marginBottom="-5px">
                    1) First, what weight are you trying to reach?
                </Typography>
                <Grid item xs={12} container justifyContent="center">
                    <TextField
                        required
                        id="weightGoal"
                        name="weightGoal"
                        label="Your weight goal is: (kg)"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.weightGoal}
                        error={formik.touched.weightGoal && Boolean(formik.errors.weightGoal)}
                        helperText={formik.touched.weightGoal && formik.errors.weightGoal}
                    />
                </Grid>
                <Divider style={{width: '96%', margin: '40px 0 20px 20px'}}/>
                <Typography variant="subtitle1" gutterBottom marginLeft="20px" marginBottom="-5px" marginTop="20px">
                    2) Second, how long do we have?
                </Typography>
                <Grid item xs={12} container justifyContent="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            label="Your deadline is:"
                            value={formik.values.dateGoal}
                            onChange={(day) => {
                                formik.setFieldValue('dateGoal', day);
                            }}
                        />
                    </LocalizationProvider>
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