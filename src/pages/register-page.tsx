import { Navigate } from "react-router-dom";
import Register from "../components/register/register";
import pageStyles from './pages.module.css';
import { getUserInfo } from "../services/actions/authorization";
import { useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const RegisterPage: React.FC = () => {
    const isAuthorized = useAppSelector((store) => store.authorization.isAuthorized);
    const dispatch = useAppDispatch();

    useEffect(() => {
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