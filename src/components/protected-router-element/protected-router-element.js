import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo } from '../../services/actions/authorization';
import { PropTypes } from 'prop-types';

export const ProtectedRouterElement = ({ element }) => {
    const isAuthorized = useSelector(store => store.authorization.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (isAuthorized ? element : <Navigate to='/login' replace/>)
}

ProtectedRouterElement.propTypes = {
    element: PropTypes.element.isRequired
};