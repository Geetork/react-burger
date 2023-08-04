import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo } from '../../services/actions/authorization';
import { PropTypes } from 'prop-types';

export const ProtectedRouterElement = ({ element }) => {
    const location = useLocation();
    const isAuthorized = useSelector(store => store.authorization.isAuthorized);

    return (isAuthorized ? element : <Navigate
        to='/login' 
        state={{ from: location }}
        replace/>)
}

ProtectedRouterElement.propTypes = {
    element: PropTypes.element.isRequired
};