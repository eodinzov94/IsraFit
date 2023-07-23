import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useAppSelector } from '../store/hooks';
import { useUpdateBmiMutation } from '../store/reducers/api-reducer';
import { IUser } from '../types/ApiTypes';
import LoaderWithError from './LoaderWithError';
interface ReportDailyBmiProps {
    open: boolean;
    setOpen: (open: boolean) => void;

}
const ReportDailyBmi: FC<ReportDailyBmiProps> = ({ open, setOpen }) => {
    const [reportBmi, {  isError, isLoading, error}] = useUpdateBmiMutation();
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
            weight: user.weight
        },
        validationSchema: toFormikValidationSchema(userUpdateSchema),
        onSubmit: values => {
            reportBmi(values).then((response: any) => {
                if(response.data.status === 'OK'){
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
            <DialogTitle>Report Daily BMI</DialogTitle>
            <LoaderWithError isError={isError} error={error} isLoading={isLoading}/>
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
                    onClick={() => formik.handleSubmit()}
                    id='cancelBMIReportButton'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportDailyBmi;