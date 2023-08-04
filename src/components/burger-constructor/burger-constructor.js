import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';

import Loader from '../loader/loader';
import OrderDetails from '../order-details/order-details';
import TotalPrice from './total-price';
import ConstructorIngredient from './constructor-ingredient';

import constructorStyles from './burger-constructor.module.css';
import { increaseCounter, decreaseCounter } from '../../services/actions/burger-ingredients';
import { makeOrder, 
         MOVE_INGREDIENT,
         REMOVE_INGREDIENT,
         ADD_BUN,
         ADD_INGREDIENT} from '../../services/actions/burger-сonstructor';
import { useNavigate } from 'react-router-dom';

const constructorIngredients = (bun, filling) => (
    Object.keys(bun).length === 0 ? 
        [...filling] :
        [{...bun, id: bun.idTop},
         ...filling,
         {...bun, id: bun.idBottom}]
)

const BurgerConstructor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isAuthorized = useSelector(store => store.authorization.isAuthorized);
    const navigate = useNavigate();

    const { bun, filling } = useSelector(store => {
        const ingredients = store.constructorIngredients;
        return {
            filling: ingredients.constructorIngredients,
            bun: ingredients.bun,
        }
    });

    const burgerIngredients = useSelector(store => 
        store.ingredients.data);

    const dispatch = useDispatch();

    const [{}, dropTargetRef] = useDrop({
        accept: ['burgerIngredient'],
        drop(itemId) {
            onDropHandler(bun, burgerIngredients, itemId);
        }
    });

    const onDropHandler = (bun, data, ingredient) => {
        ingredient.type === 'bun' ?
            dispatch({
                type: ADD_BUN,
                idTop: v4(),
                idBottom: v4(),
                ingredient
            }) :
            dispatch({
                type: ADD_INGREDIENT,
                id: v4(),
                ingredient
            });
        ingredient.type === 'bun' &&
            Object.keys(bun).length &&
            dispatch(decreaseCounter(data, bun._id));

        dispatch(increaseCounter(data, ingredient._id));
    };

    const handleOpenModal = () => {
        const ingredients = [bun, ...filling, bun]
            .map(ingredient => ingredient._id);

        if (!isAuthorized) {
            navigate('/login');
        } else {
            dispatch(makeOrder(ingredients))
            setIsVisible(true);
        };
    };

    const onClose = () => {
        setIsVisible(false);
    };

    const deleteIngredient = (e, id, _id, type) => {
        if (type !== 'bun' && e.target.closest('span')?.classList.value ===
            'constructor-element__action pr-2') {
            dispatch({
                type: REMOVE_INGREDIENT,
                id 
            });
            dispatch(decreaseCounter(burgerIngredients, _id));
        }
    };

    const moveIngredient = (prevId, currentId) => {
       dispatch({
        type: MOVE_INGREDIENT,
        prevId: prevId,
        currentId: currentId
       });
    };   

    return (
        <section className={`${constructorStyles.container} ml-5 pt-25`}>
            <div className={constructorStyles.scroll__container}
                 ref={dropTargetRef}>
                <div className={`${constructorStyles.ingredients__list} pr-2`}>      
                    {
                        constructorIngredients(bun, filling).map((el, id) => (
                            <ConstructorIngredient
                                key={el.id}
                                id={id}
                                ingredient={el}
                                moveIngredient={moveIngredient}
                                deleteIngredient={deleteIngredient}/>
                    ))}
                </div>
            </div>
            
            <div className={`${constructorStyles.total} pt-10`}>
                <TotalPrice />
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOpenModal}
                    disabled={Object.keys(bun).length === 0 ? true : false}>
                    Оформить заказ
                </Button>
            </div>
            { isVisible && <OrderDetails onClose={onClose}/> }
        </section>
    )
}

export default BurgerConstructor;