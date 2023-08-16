import { Navigate } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import Register from "../components/register/register";
import pageStyles from './pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';

const RegisterPage: React.FC = () => {
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(getUserInfo());
    }, []);

    return (
        isAuthorized ? <Navigate to='/' replace/> :
            <main className={pageStyles.container}>
                <Register/>
            </main>
    )
}

export default RegisterPage;