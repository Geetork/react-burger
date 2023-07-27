import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { Navigate } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import ForgotPassword from "../components/forgot-password/forgot-password";
import pageStyles from './pages.module.css';

const ForgotPasswordPage = () => {
    const isAuthorized = useSelector(store => store.authorization.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        isAuthorized ? <Navigate to='/' replace/> :
        <>
            <AppHeader/>
            <main className={pageStyles.container}>
                <ForgotPassword/>
            </main>
        </>
    )
}

export default ForgotPasswordPage;