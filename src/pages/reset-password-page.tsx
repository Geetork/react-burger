import { Navigate, useLocation } from "react-router-dom";
import ResetPassword from "../components/reset-password/reset-password";
import pageStyles from './pages.module.css';
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const ResetPasswordPage: React.FC = () => {
    const isAuthorized = useAppSelector((store) => store.authorization.isAuthorized);
    const isPasswordReset = useAppSelector((store) => store.resetPassword.isPasswordReset);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
            isAuthorized ? <Navigate to='/' replace/> : 
                fromPage === '/forgot-password' ?
                    isPasswordReset ? <Navigate to='/login' replace/> :
                    <main className={pageStyles.container}>
                        <ResetPassword/>
                    </main> :
                    <Navigate to='/forgot-password' replace/>  
    )
}

export default ResetPasswordPage;