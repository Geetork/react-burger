import { Navigate, useLocation } from "react-router-dom";
import Login from "../components/login/login";
import { useEffect } from "react";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { RootState } from "../utils/types";
import { AppDispatch } from "../services/actions/navigation";

const LoginPage: React.FC = () => {
    const isAuthorized = useSelector((store: RootState) => store.authorization.isAuthorized);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

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