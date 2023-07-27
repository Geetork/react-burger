import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

import { DragIcon,
         ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

const ConstructorIngredient = ({ 
    id,
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

    const [, drag] = useDrag({
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

export default ConstructorIngredient;