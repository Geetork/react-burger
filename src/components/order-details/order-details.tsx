import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../loader/loader';
import Modal from '../modal/modal';
import checkMark from './graphics.svg';

const OrderDetails: FunctionComponent<{onClose: () => void}> = ({ onClose }) => {
    const { order, isLoading } = useSelector((store: any) => ({
        order: store.constructorIngredients.order,
        isLoading: store.constructorIngredients.isLoading
    }));

    return (
        !isLoading ? <Modal onClose={onClose}>
            <span className="text text_type_digits-large mt-10 mb-8">{order}</span>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img src={checkMark} alt='oops..' style={{ height: 120 }}/>
            <span className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-small mb-20">
                Дождитесь готовности на орбитальной станции
            </span>
        </Modal> : <Loader/>
    )
}

export default OrderDetails;