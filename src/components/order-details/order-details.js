import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import checkMark from './graphics.svg';

const OrderDetails = (props) => {
    return (
        <Modal setIsVisible={props.setIsVisible}>
            <span className="text text_type_digits-large mt-10 mb-8">034530</span>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img src={checkMark} alt='oops..' style={{ height: 120 }}/>
            <span className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-small mb-20">
                Дождитесь готовности на орбитальной станции
            </span>
        </Modal>
    )
}

OrderDetails.propTypes = {
    setIsVisible: PropTypes.func
};

export default OrderDetails;