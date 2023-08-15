import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';

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
import { IIngredient, IDroppedIngredient } from '../../utils/types';

interface IBun extends IIngredient {
    idTop: string;
    idBottom: string;
};

const constructorIngredients = (bun: IBun | null, filling: Array<IDroppedIngredient>): IDroppedIngredient[] => (
    bun ?
        [{...bun, id: bun.idTop},
            ...filling,
            {...bun, id: bun.idBottom}] :
        [...filling]    
)

const BurgerConstructor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isAuthorized = useSelector((store: any) => store.authorization.isAuthorized);
    const navigate = useNavigate();

    const { bun, filling } = useSelector((store: any) => {
        const ingredients = store.constructorIngredients;
        return {
            filling: ingredients.constructorIngredients,
            bun: ingredients.bun,
        }
    });

    const burgerIngredients = useSelector((store: any) => 
        store.ingredients.data);

    const dispatch = useDispatch();

    const [, dropTargetRef] = useDrop({
        accept: ['burgerIngredient'],
        drop(item: IIngredient) {
            onDropHandler(bun, burgerIngredients, item);
        }
    });

    const onDropHandler = (bun: IBun | null, data: IIngredient[], ingredient: IIngredient) => {
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
            bun &&
            //@ts-ignore
            dispatch(decreaseCounter(data, bun._id));
        
        //@ts-ignore
        dispatch(increaseCounter(data, ingredient._id));
    };

    const handleOpenModal = () => {
        const ingredients = [bun, ...filling, bun]
            .map(ingredient => ingredient._id);

        if (!isAuthorized) {
            navigate('/login');
        } else {
            //@ts-ignore
            dispatch(makeOrder(ingredients))
            setIsVisible(true);
        };
    };

    const onClose = () => {
        setIsVisible(false);
    };

    const deleteIngredient = (e: React.MouseEvent<HTMLElement>, id: number, _id: string, type: string) => {
        if (type !== 'bun' && (e.target as HTMLButtonElement).closest('span')?.classList.value ===
            'constructor-element__action pr-2') {
            dispatch({
                type: REMOVE_INGREDIENT,
                id 
            });
            //@ts-ignore
            dispatch(decreaseCounter(burgerIngredients, _id));
        }
    };

    const moveIngredient = (prevId: number, currentId: number) => {
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
                    disabled={!bun ? true : false}>
                    Оформить заказ
                </Button>
            </div>
            { isVisible && <OrderDetails onClose={onClose}/> }
        </section>
    )
}

export default BurgerConstructor;