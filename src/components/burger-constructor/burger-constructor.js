import { useState } from 'react';
import { Button,
         ConstructorElement,
         CurrencyIcon,
         DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';

import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const [state, setState] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    return (
        <section style={{ overflow: 'hidden' }} 
                 className={`${constructorStyles.container} ml-5 pt-25`}>
            <div className={constructorStyles.scroll__container}>
                <div className={`${constructorStyles.ingredients__list} pr-2`}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
                    <div className={constructorStyles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Говяжий метеорит (отбивная)"
                            price={3000}
                            thumbnail={"https://code.s3.yandex.net/react/code/meat-04-mobile.png"}
                        />
                    </div>
                    <div className={constructorStyles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Говяжий метеорит (отбивная)"
                            price={3000}
                            thumbnail={"https://code.s3.yandex.net/react/code/meat-04-mobile.png"}
                        />
                    </div>
                    {
                        state.map((el, id) => (
                            <div className={constructorStyles.ingredient}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    key={id}
                                    text={el.name}
                                    price={el.price}
                                    thumbnail={el.image_mobile}
                                />
                            </div>
                        ))
                    }
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={1255}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
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