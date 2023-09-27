import { useEffect } from 'react';

import Main from '../components/main/main';

import appStyles from './pages.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

const ConstructorPage: React.FC = () => {
    const path = window.location.pathname;
    const navigate = useNavigate();

    const { data, ingredientsFailed } = useAppSelector((store) => ({
        data: store.ingredients.data,
        ingredientsFailed: store.ingredients.ingredientsFailed,
    }));

    useEffect(() => {
        navigate(path);
    }, []);

    return (
        <div className={appStyles.app}>
            {ingredientsFailed && 
                <span className="text text_type_main-large">
                    Произошла ошибка...
                </span>
            }
            {!ingredientsFailed && data.length && <Main />}    
        </div>
    )
}

export default ConstructorPage;