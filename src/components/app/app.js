import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { GET_CONSTRUCTOR_INGREDIENTS } from '../../services/actions/burger-сonstructor';

import appStyles from './app.module.css';

const App = () => { 
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

export default App;