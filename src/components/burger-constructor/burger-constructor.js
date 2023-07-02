import { useState } from 'react';
import { Button,
         ConstructorElement,
         CurrencyIcon,
         DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';

import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    return (
        <section className={`${constructorStyles.container} ml-5 pt-25`}>
            <div className={constructorStyles.scroll__container}>
                <div className={`${constructorStyles.ingredients__list} pr-2`}>
                    <div>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={1255}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                        />
                    </div>            
                    {
                        props.data.map((el, id) => (
                            <div key={id} className={constructorStyles.ingredient}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={el.name}
                                    price={el.price}
                                    thumbnail={el.image_mobile}
                                />
                            </div>
                        ))
                    }
                    <div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={1255}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                        />
                    </div>
                </div>
            </div>
            
            <div className={`${constructorStyles.total} pt-10`}>
                <span className="text text_type_main-large mr-10">
                    <span className="text text_type_main-large pr-2">640</span>
                    <CurrencyIcon type="primary" />
                </span>
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

export default BurgerConstructor;