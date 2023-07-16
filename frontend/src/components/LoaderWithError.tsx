import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { FC } from "react";
import { isErrorWithDataAndMessage } from "../helpers/helpers";


interface LoaderWithErrorProps {
    isError: boolean
    error: any
    isLoading: boolean
}

const LoaderWithError:FC<LoaderWithErrorProps> = ({ isError, error, isLoading }) => {
    return (
        <>
        <Snackbar open={isError} autoHideDuration={7000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {isErrorWithDataAndMessage(error) && error.data.message || 'Something went wrong'}
                </Alert>
            </Snackbar>
            {isLoading && <LinearProgress />}
        </>    
    );
};

export default LoaderWithError;