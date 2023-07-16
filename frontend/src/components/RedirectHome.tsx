import { Navigate } from 'react-router-dom';

const RedirectHome = () => {
    return (
        <Navigate replace to={'/'} />
    );
};

export default RedirectHome;