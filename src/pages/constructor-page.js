import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../components/main/main';
import { getIngredients } from '../services/actions/burger-ingredients';

import appStyles from './pages.module.css';
import Loader from '../components/loader/loader';

const ConstructorPage = () => {
    const { data, ingredientsFailed } = useSelector(store => ({
        data: store.ingredients.data,
        ingredientsFailed: store.ingredients.ingredientsFailed,
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
            {!ingredientsFailed && data.length && <Main />}    
        </div>
    )
}

export default ConstructorPage;