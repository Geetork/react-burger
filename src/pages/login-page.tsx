import { Navigate, useLocation } from "react-router-dom";
import Login from "../components/login/login";
import { useEffect } from "react";
import pageStyles from './pages.module.css';
import { getUserInfo } from "../services/actions/authorization";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const LoginPage: React.FC = () => {
    const isAuthorized = useAppSelector((store) => store.authorization.isAuthorized);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        isAuthorized ? <Navigate to={fromPage} replace/> :
            <main className={pageStyles.container}>
                <Login/>
            </main>
    )
}

export default LoginPage;