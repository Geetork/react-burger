import { useEffect, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { useLocation } from 'react-router-dom';

const modalRoot = document.getElementById("modal") as Element;

const ModalOverlay: React.FC<{ handleCloseModal: () => void }> = ({
    handleCloseModal }) => {
    return (
        <div onClick={handleCloseModal} 
             className={modalStyles.overlay}/>
    )
}

type TModal = {
    title?:string;
    onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<TModal>> = (props) => {
    const handleCloseModal = () => {
        props.onClose();
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            e.key === 'Escape' &&
            props.onClose();
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

export default Modal;