import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../components/app-header/app-header';
import Main from '../components/main/main';
import { getIngredients } from '../services/actions/burger-ingredients';

import appStyles from './pages.module.css';

const ConstructorPage = () => {
    const { data, ingredientsFailed } = useSelector(store => ({
        data: store.ingredients.data,
        ingredientsFailed: store.ingredients.ingredientsFailed
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    return (
        <div className={appStyles.app}>
            {ingredientsFailed && 
                <span className="text text_type_main-large">
                    Произошла ошибка...
                </span>
            }
            {!ingredientsFailed && data.length &&
                <>
                    <AppHeader />
                    <Main />
                </> 
            }    
        </div>
    )
}

export default ConstructorPage;