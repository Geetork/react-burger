import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';

import OrderDetails from '../order-details/order-details';
import TotalPrice from './total-price';
import ConstructorIngredient from './constructor-ingredient';

import constructorStyles from './burger-constructor.module.css';
import { increaseCounter, decreaseCounter, AppDispatch } from '../../services/actions/burger-ingredients';
import { makeOrder, 
         MOVE_INGREDIENT,
         REMOVE_INGREDIENT,
         ADD_BUN,
         ADD_INGREDIENT,
         } from '../../services/actions/burger-сonstructor';
import { useNavigate } from 'react-router-dom';
import { IIngredient, IDroppedIngredient, IBun, RootState } from '../../utils/types';

const constructorIngredients = (bun: IBun | null, filling: IDroppedIngredient[]): IDroppedIngredient[] => (
    bun ?
        [{...bun, id: bun.idTop},
            ...filling,
            {...bun, id: bun.idBottom}] :
        [...filling]    
)

const BurgerConstructor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isAuthorized = useSelector((store: RootState) => store.authorization.isAuthorized);
    const navigate = useNavigate();

    const { bun, filling } = useSelector((store: RootState) => ({
        filling: store.constructorIngredients.constructorIngredients,
        bun: store.constructorIngredients.bun,     
    }));

    const burgerIngredients = useSelector((store: RootState) => 
        store.ingredients.data);

    const dispatch = useDispatch<AppDispatch>();

    const [, dropTargetRef] = useDrop({
        accept: ['burgerIngredient'],
        drop(item: IIngredient) {
            onDropHandler(bun, burgerIngredients, item);
        }
    });

    const onDropHandler = (bun: IBun | null, data: ReadonlyArray<IIngredient>, ingredient: IIngredient) => {
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
            dispatch(decreaseCounter(data, bun._id));
        

        dispatch(increaseCounter(data, ingredient._id));
    };

    const handleOpenModal = () => {
        const ingredients = [bun, ...filling, bun]
            .map(ingredient => ingredient?._id);

        if (!isAuthorized) {
            navigate('/login');
        } else {
            dispatch(makeOrder(ingredients as string[]))
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