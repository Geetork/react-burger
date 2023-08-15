import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { FunctionComponent, useRef } from 'react';

import { DragIcon,
         ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import { IIngredient } from '../../utils/types';

interface IConstructorIngredient {
    id: number;
    ingredient: IIngredient;
    deleteIngredient: (e: React.MouseEvent<HTMLElement>, id: number, _id: string, type: string) => void;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const ConstructorIngredient: FunctionComponent<IConstructorIngredient> = ({ 
    id,
    ingredient,
    deleteIngredient,
    moveIngredient
    }) => {                               
    const ref = useRef<HTMLInputElement>(null)
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
    const dragIndex = (item as IConstructorIngredient).id;
    const hoverIndex = id;

    if (dragIndex === hoverIndex) {
        return;
    }

    const hoverBoundingRect = ref.current?.getBoundingClientRect();

    const hoverMiddleY =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
    }

        moveIngredient(dragIndex, hoverIndex);
        (item as IConstructorIngredient).id = hoverIndex;
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

export default ConstructorIngredient;