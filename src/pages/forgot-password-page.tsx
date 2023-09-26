import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { Navigate, useLocation } from "react-router-dom";
import ForgotPassword from "../components/forgot-password/forgot-password";
import pageStyles from './pages.module.css';
import { AppDispatch } from "../services/actions/navigation";

const ForgotPasswordPage: React.FC = () => {
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);
    const emailRequest = useSelector((store: any) => store.resetPassword.gotEmail);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

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