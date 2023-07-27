import { Navigate } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import Login from "../components/login/login";
import { useEffect } from "react";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";

const LoginPage = () => {
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
                <Login/>
            </main>
        </>
    )
}

export default LoginPage;