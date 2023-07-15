import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { FC } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useAppSelector } from '../store/hooks';
import { IUser } from '../types/ApiTypes';
interface ReportDailyBmiProps {
    open: boolean;
    setOpen: (open: boolean) => void;

}
const ReportDailyBmi: FC<ReportDailyBmiProps> = ({ open, setOpen }) => {
    const closeAndRestForm = () => {
        setOpen(false);
        formik.resetForm();
    }
    const user = useAppSelector(state => state.auth.user) as IUser
    const userUpdateSchema = z.object({
        weight: z.number({ required_error: "Please enter your weight" })
            .gte(35, "You cannot be under 35kg!")
            .lte(250, "You must be at most 250kg!"),
    })
    const formik = useFormik({
        initialValues: {
            weight: user.weight,
            TDEE: user.TDEE
        },
        validationSchema: toFormikValidationSchema(userUpdateSchema),
        onSubmit: values => {
            const BMR = (10 * user.weight + 6.25 * user.height - 5 * (dayjs().year() - user.birthYear)) + (user.gender === 'Male' ? 5 : -161); //formula
            values.TDEE = BMR * user.physicalActivity; //total daily energy expenditure formula
            //backend update
            console.log(values)
        },
    });

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={closeAndRestForm}
        >
            <DialogTitle>Report Daily BMI</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ alignItems: 'center', }}>
                    <TextField
                        fullWidth
                        margin='normal'
                        variant="outlined"
                        name="weight"
                        label="Enter your weight"
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
                </Box>
            </DialogContent>
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
                    fullWidth
                    variant="contained"
                    sx={{ color: 'white' }}
                    type="submit"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportDailyBmi;