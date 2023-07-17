import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image404 from '../assets/Page404.jpg';
const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };
    return (
        <Box sx={{
            mt: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <img src={Image404} alt="404 Not Found" width={350} />
            <Button
                sx={{ mt: 2, color: 'white', fontSize: { sx: '4rem', md: '2rem' } }}
                variant="contained"
                color="primary"
                onClick={handleGoHome}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;
