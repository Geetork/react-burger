import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types';

const BurgerIngredient = ({ingredient, setModalData, handleOpenModal}) => {
    const openModal = () => {
        setModalData({...ingredient});
        handleOpenModal();
    };

    return (
        <div className={`${ingredientsStyles.card} ml-3 mr-3`}
             onClick={openModal}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img alt='oops..' src={ingredient.image_large} 
                 className={ingredientsStyles.img}/>
            <div className={`${ingredientsStyles.card__price} mt-1 mb-1`}>
                <span className='text text_type_digits-default pr-1'>
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <span style={{ textAlign: 'center' }} 
                  className="text text_type_main-default">
                {ingredient.name}
            </span>
        </div>
    )
}

BurgerIngredient.propTypes = { 
    ingredient: PropTypes.shape({ ...ingredientPropTypes }).isRequired,
    setModalData: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired
};

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки');
    const [isVisible, setIsVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    const ingredientType = {
        'Булки': 'bun',
        'Соусы': 'sauce',
        'Начинки': 'main'
    };

    return (
        <section className={`${ingredientsStyles.container} mr-5`}>
            <h1 className='text text_type_main-large pt-10 pb-4'>
                Соберите бургер
            </h1>
            <div className={`${ingredientsStyles.tabs} pb-10`}>
                <Tab 
                    value="Булки" 
                    active={current === 'Булки'} 
                    onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab 
                    value="Соусы" 
                    active={current === 'Соусы'} 
                    onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab 
                    value="Начинки" 
                    active={current === 'Начинки'} 
                    onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${ingredientsStyles.ingredients}
                             ${ingredientsStyles.scroll__container}`}>
                {
                    ['Булки', 'Соусы', 'Начинки'].map((title, id) => (
                        <div key={id}>
                            <h2 className="text text_type_main-medium pb-6">
                                {title}
                            </h2> 
                            <div className={ingredientsStyles.ingredients__list}>
                            {
                                props.data.map((ingredient, id) => (
                                    <BurgerIngredient 
                                        handleOpenModal={handleOpenModal}
                                        setModalData={setModalData} 
                                        ingredient={{...ingredient}} 
                                        key={id}/>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }        
            </div>
            { isVisible &&
              <IngredientDetails {...modalData} 
                                 setIsVisible={setIsVisible}/>}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({ ...ingredientPropTypes })).isRequired
};

export default BurgerIngredients;