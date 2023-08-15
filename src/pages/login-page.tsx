import { Navigate, useLocation } from "react-router-dom";
import Login from "../components/login/login";
import { useEffect } from "react";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";

const LoginPage = () => {
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);
    const location = useLocation();
    const dispatch = useDispatch();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        //@ts-ignore
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