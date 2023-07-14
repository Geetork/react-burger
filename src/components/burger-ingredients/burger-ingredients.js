import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsStyles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import { OPEN_INGREDIENT_MODAL } from '../../services/actions/burger-ingredients';

const BurgerIngredient = ({ ingredient, handleOpenModal }) => {
    const counter = useSelector(store => 
        store.ingredients.data.find(item => 
            item._id === ingredient._id)?.count);

    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: { ...ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });

    const openModal = () => {
        dispatch({
            type: OPEN_INGREDIENT_MODAL,
            ingredient: ingredient 
        });
        handleOpenModal();
    };

    return (
        !isDrag &&
            <div className={`${ingredientsStyles.card} ml-3 mr-3`}
                onClick={openModal}
                ref={dragRef}>
                {
                    (counter && counter !== 0) ?
                        <Counter count={counter} size="default" extraClass="m-1" /> : ''
                }
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
    handleOpenModal: PropTypes.func.isRequired
};

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('Булки');
    const [isVisible, setIsVisible] = useState(false);

    const tabs = ['Булки', 'Соусы', 'Начинки'];
    const ingredientType = {
        'Булки': 'bun',
        'Соусы': 'sauce',
        'Начинки': 'main'
    };

    const data = useSelector(store => store.ingredients.data);

    const handleOpenModal = () => setIsVisible(true);

    const onScroll = () => {       
        const ingredientsContainer = 
            document.getElementById('ingredients__container')
            .getBoundingClientRect().y;

        const dists = tabs.map((title) => 
            Math.abs(document.getElementById(title)
            .getBoundingClientRect().y - ingredientsContainer));

        const minDist = Math.min(...dists);
        setCurrent(tabs[dists.findIndex(el => el == minDist)]);
    };

    return (
        <section className={`${ingredientsStyles.container} mr-5`}>
            <h1 className='text text_type_main-large pt-10 pb-4'>
                Соберите бургер
            </h1>
            <div className={`${ingredientsStyles.tabs} pb-10`}>
                {
                    tabs.map((tab, index) => (
                        <Tab 
                            key={index}
                            value={tab}
                            active={current === tab} 
                            onClick={setCurrent}>
                            {tab}
                        </Tab>
                    ))
                }
            </div>
            <div id='ingredients__container' 
                 onScroll={onScroll}
                 className={`${ingredientsStyles.ingredients}
                             ${ingredientsStyles.scroll__container}`}>
                {
                    tabs.map((title, id) => (
                        <div key={id}>
                            <h2 id={title} className="text text_type_main-medium pb-6">
                                {title}
                            </h2> 
                            <div className={ingredientsStyles.ingredients__list}>
                            {   
                                data.map((ingredient, id) => {
                                    if (ingredient.type === ingredientType[title])
                                        return <BurgerIngredient
                                            handleOpenModal={handleOpenModal} 
                                            ingredient={{...ingredient}} 
                                            key={id}/>
                                })
                            }
                            </div>
                        </div>
                    ))
                }        
            </div>
            { isVisible &&
              <IngredientDetails setIsVisible={setIsVisible}/>}
        </section>
    )
}

export default BurgerIngredients;