import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ADD_INGREDIENT, ADD_BUN } from '../../services/actions/burger-сonstructor';
import { decreaseCounter, increaseCounter } from '../../services/actions/burger-ingredients';

import mainStyles from './main.module.css';

const Main = () => {
    const dispatch = useDispatch();

    const onDropHandler = (bun, data, ingredient) => {
        dispatch({
            type: ingredient.type === 'bun' ? 
                    ADD_BUN :
                    ADD_INGREDIENT,
            ingredient
        });
        ingredient.type === 'bun' &&
            Object.keys(bun).length &&
            dispatch(decreaseCounter(data, bun._id));

        dispatch(increaseCounter(data, ingredient._id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={`${mainStyles.container}`}>
                <BurgerIngredients />
                <BurgerConstructor onDropHandler={onDropHandler}/>
            </main>
        </DndProvider>
    )
}

export default Main;