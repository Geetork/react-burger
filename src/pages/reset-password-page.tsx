import { Navigate, useLocation } from "react-router-dom";
import ResetPassword from "../components/reset-password/reset-password";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';

const ResetPasswordPage = () => {
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);
    const isPasswordReset = useSelector((store: any) => store.resetPassword.isPasswordReset);
    const location = useLocation();
    const dispatch = useDispatch();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        //@ts-ignore
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