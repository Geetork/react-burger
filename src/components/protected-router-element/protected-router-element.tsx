import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';

export const ProtectedRouterElement: React.FC<{ element: React.ReactElement}> = ({ element }) => {
    const location = useLocation();
    const isAuthorized = useAppSelector((store) => store.authorization.isAuthorized);

    location.pathname = window.location.pathname;

    return (isAuthorized ? element : <Navigate
        to='/login' 
        state={{ from: location }}
        replace/>)
}