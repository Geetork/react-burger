import { Navigate, useLocation } from "react-router-dom";
import ResetPassword from "../components/reset-password/reset-password";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { RootState } from "../utils/types";
import { AppDispatch } from "../services/actions/navigation";

const ResetPasswordPage: React.FC = () => {
    const isAuthorized = useSelector((store: RootState) => store.authorization.isAuthorized);
    const isPasswordReset = useSelector((store: RootState) => store.resetPassword.isPasswordReset);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

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