import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

const modalRoot = document.getElementById("modal");

const ModalOverlay = (props) => {
    return (
        <div onClick={props.handleCloseModal} 
             className={modalStyles.overlay}/>
    )
}

const Modal = (props) => {
    const handleCloseModal = () => {
        props.onClose();
        // props.setIsVisible(false);
        window.history.replaceState(null, '', '/');
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            event.key === 'Escape' &&
            props.onClose();
            // props.setIsVisible(false);
            window.history.replaceState(null, '', '/');
        };
       
        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    return ReactDOM.createPortal((
        <div className={modalStyles.container}>
            <ModalOverlay handleCloseModal={handleCloseModal}/>

            <div className={modalStyles.modal}>
                <div className={`${modalStyles.modal__content} p-10`}>
                    <div className={modalStyles.modal__header}>
                        <span className="text text_type_main-large">
                            {props.title}
                        </span>
                        <CloseIcon
                            onClick={handleCloseModal}
                            className={modalStyles.close__button} 
                            type="primary" />
                    </div>

                    <div className={modalStyles.modal__main}>
                        {props.children}
                    </div>
                </div>                
            </div>          
        </div>        
    ), modalRoot)
}

Modal.propTypes = {
    title: PropTypes.string,
    // setIsVisible: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;