import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { Navigate, useLocation } from "react-router-dom";
import ForgotPassword from "../components/forgot-password/forgot-password";
import pageStyles from './pages.module.css';
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const ForgotPasswordPage: React.FC = () => {
    const isAuthorized = useAppSelector((store) => store.authorization.isAuthorized);
    const emailRequest = useAppSelector((store) => store.resetPassword.gotEmail);
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        isAuthorized ? <Navigate to='/' replace/> :
            emailRequest ? 
                <Navigate
                    to='/reset-password'
                    state={{ from: location }}
                    replace/> :
                    <main className={pageStyles.container}>
                        <ForgotPassword/>
                    </main>
    )
}

export default ForgotPasswordPage;