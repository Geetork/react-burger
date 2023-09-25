import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';

export const ProtectedRouterElement: React.FC<{ element: React.ReactElement}> = ({ element }) => {
    const location = useLocation();
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);

    location.pathname = window.location.pathname;

    return (isAuthorized ? element : <Navigate
        to='/login' 
        state={{ from: location }}
        replace/>)
}