import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouterElement: React.FC<{ element: React.ReactElement}> = ({ element }) => {
    const location = useLocation();
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);

    return (isAuthorized ? element : <Navigate
        to='/login' 
        state={{ from: location }}
        replace/>)
}