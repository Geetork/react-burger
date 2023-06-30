import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';

const BurgerIngredient = (props) => {
    return (
        <div className={`${ingredientsStyles.card} ml-3 mr-3`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img alt='oops..' src={props.image_large} className={ingredientsStyles.img}/>
            <div className={`${ingredientsStyles.card__price} mt-1 mb-1`}>
                <span className='text text_type_digits-default pr-1'>
                    {props.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <span style={{ textAlign: 'center' }} className="text text_type_main-default">
                {props.name}
            </span>
        </div>
    )
}

BurgerIngredient.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
};

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки');

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
            <div style={{ display: 'flex' }} className='pb-10'>
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
            <div className={ingredientsStyles.ingredients}>
                <h2 className="text text_type_main-medium pb-6">
                    {current}
                </h2> 
                <div className={`${ingredientsStyles.ingredients__list}
                                 ${ingredientsStyles.scroll__container}`}>
                {
                    props.data.map((ingredient, id) => (
                        ingredient.type === ingredientType[current] &&
                        <BurgerIngredient {...ingredient} key={id}/>
                    ))
                }
                </div>             
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
       _id: PropTypes.string,
       name: PropTypes.string,
       type: PropTypes.string,
       proteins: PropTypes.number,
       fat: PropTypes.number,
       carbohydrates: PropTypes.number,
       calories: PropTypes.number,
       price: PropTypes.number,
       image: PropTypes.string,
       image_mobile: PropTypes.string,
       image_large: PropTypes.string,
       __v: PropTypes.number
    })).isRequired
};

export default BurgerIngredients;