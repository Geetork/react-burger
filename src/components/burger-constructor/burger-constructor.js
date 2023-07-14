import { useState,
         useEffect, 
         useReducer,
         useCallback,
         useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button,
         ConstructorElement,
         CurrencyIcon,
         DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrop, useDrag } from 'react-dnd';

import OrderDetails from '../order-details/order-details';

import constructorStyles from './burger-constructor.module.css';
import { decreaseCounter } from '../../services/actions/burger-ingredients';
import { makeOrder, 
         MOVE_INGREDIENT,
         REMOVE_INGREDIENT} from '../../services/actions/burger-сonstructor';
import { ingredientPropTypes } from '../../utils/prop-types';

const TotalPrice = ({ totalPrice }) => {
    return (
        <span className="text text_type_main-large mr-10">
            <span className="text text_type_main-large pr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
        </span>
    )
}

const ConstructorIngredient = ({ id,
                                 ingredient,
                                 deleteIngredient,
                                 moveIngredient
                                 }) => {                               
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
      accept: 'filling',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.id;
        const hoverIndex = id;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()
   
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        moveIngredient(dragIndex, hoverIndex);
        item.id = hoverIndex;
      },
    })
    const [{ isDrag }, drag] = useDrag({
      type: 'filling',
      item: () => {
        return {id}
      },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    })

    drag(drop(ref));

    return (
        <div {...ingredient.type !== 'bun' && {ref: ref}}
             data-handler-id={handlerId}
             onClick={(e) => {
                deleteIngredient(e, id, ingredient._id, ingredient.type);
             }}
             className={constructorStyles.ingredient}>
            {ingredient.type !== 'bun' ? <DragIcon type="primary" /> : ''}
            <ConstructorElement                                   
                type={ingredient.type === 'bun' ?
                id === 0 ? 'top' : 'bottom' :
                    undefined
                }
                isLocked={ingredient.type === 'bun' ? true : false}
                text={`${ingredient.name} ${ingredient.type === 'bun' ? 
                    id === 0 ? '(вверх)' : '(низ)' : ''}`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
            />
        </div>
    )
};

ConstructorIngredient.propTypes = {
    id: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({ ...ingredientPropTypes }).isRequired,
    moveIngredient: PropTypes.func.isRequired,
    deleteIngredient: PropTypes.func.isRequired,
};

TotalPrice.propTypes = {
    totalPrice: PropTypes.number.isRequired
};

function reducer(state, action) {
    switch(action.type) {
        case 'getTotalPrice': {
            return {
                ...state,
                totalPrice: action.data.reduce((acc, current) => 
                    acc += current.price, 0)}
        }
    }
}

const constructorIngredients = (bun, filling) => (
    Object.keys(bun).length == 0 ? 
        [...filling] :
        [bun, ...filling, bun]
)

const BurgerConstructor = ({ onDropHandler }) => {
    const [isVisible, setIsVisible] = useState(false);

    const { bun, filling } = useSelector(store => {
        const ingredients = store.constructorIngredients;
        return {
            filling: ingredients.constructorIngredients,
            bun: ingredients.bun,
        }
    });

    const burgerIngredients = useSelector(store => 
        store.ingredients.data);

    const [totalPrice, priceDispatch] = useReducer(reducer, {
        totalPrice: 0,
        data: []
    });

    const [{}, dropTargetRef] = useDrop({
        accept: ['burgerIngredient'],
        drop(itemId) {
            onDropHandler(bun, burgerIngredients, itemId);
        }
    });

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        const ingredients = [bun, ...filling, bun]
            .map(ingredient => ingredient._id);
        dispatch(makeOrder(ingredients));
        setIsVisible(true);
    };

    const deleteIngredient = (e, id, _id, type) => {
        if (type !== 'bun' && e.target.closest('span')?.classList == 
            'constructor-element__action pr-2') {
            // dispatch(removeIngredient(filling, 
            //     Object.keys(bun).length ? --id : id));
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

    const renderIngredient = useCallback((id, el) => (
        <ConstructorIngredient key={id}
            id={id}
            ingredient={el}
            moveIngredient={moveIngredient}
            deleteIngredient={deleteIngredient}/>
    ), [])

    useEffect(() => {
        priceDispatch({
            type: 'getTotalPrice',
            data: constructorIngredients(bun, filling)
        });
    }, [bun, filling]);

    return (
        <section className={`${constructorStyles.container} ml-5 pt-25`}>
            <div className={constructorStyles.scroll__container}
                 ref={dropTargetRef}>
                <div className={`${constructorStyles.ingredients__list} pr-2`}>      
                    {
                        constructorIngredients(bun, filling).map((el, id) =>
                            renderIngredient(id, el))
                    }
                </div>
            </div>
            
            <div className={`${constructorStyles.total} pt-10`}>
                <TotalPrice totalPrice={totalPrice.totalPrice}/>
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>

            { isVisible && <OrderDetails setIsVisible={setIsVisible}/> }
        </section>
    )
}

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
};

export default BurgerConstructor;