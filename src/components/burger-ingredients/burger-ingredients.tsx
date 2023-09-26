import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, RootState } from '../../utils/types';

import ingredientsStyles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { OPEN_INGREDIENT_MODAL } from '../../services/actions/burger-ingredients';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

interface IBurgerIngredient {
    ingredient: IIngredient;
    handleOpenModal: () => void;
}

const BurgerIngredient: React.FC<IBurgerIngredient> = ({ ingredient, handleOpenModal }) => {
    const counter = useSelector((store: RootState) => 
        store.ingredients.data.find((item: IIngredient) => 
            item._id === ingredient._id)?.count);

    const dispatch = useDispatch();
    const location = useLocation();

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
        !isDrag ?
        <Link className={ingredientsStyles.link}
            to={`/ingredients/${ingredient._id}`}
            state={{ background: location }}>
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
        </Link> : <></>
    )
}

const tabs = ['Булки', 'Соусы', 'Начинки'];

type TIngredientType = 'Булки' | 'Соусы' | 'Начинки';
type TIngredientTypeName = 'bun' | 'sauce' | 'main';

const ingredientType: Record<TIngredientType, TIngredientTypeName> = {
    'Булки': 'bun',
    'Соусы': 'sauce',
    'Начинки': 'main'
};

const BurgerIngredients: React.FC = () => {
    const [current, setCurrent] = useState('Булки');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const data = useSelector((store: RootState) => store.ingredients.data);

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    const onScroll = () => {       
        const ingredientsContainer = 
            (document.getElementById('ingredients__container') as HTMLDivElement)
            .getBoundingClientRect().y;

        const dists = tabs.map((title) => 
            Math.abs((document.getElementById(title) as HTMLDivElement)
            .getBoundingClientRect().y - ingredientsContainer));

        const minDist = Math.min(...dists);
        setCurrent(tabs[dists.findIndex(el => el === minDist)]);
    };

    const onClose = () => {
        setIsVisible(false);
        navigate(-1);
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
                                data.map((ingredient: IIngredient, id: number) => {
                                    if (ingredient.type === ingredientType[title as TIngredientType])
                                        return (
                                                <BurgerIngredient
                                                        handleOpenModal={handleOpenModal} 
                                                        ingredient={{...ingredient}} 
                                                        key={id}/>
                                        )
                                })
                            }
                            </div>
                        </div>
                    ))
                }        
            </div>
            { isVisible &&
              <IngredientDetails onClose={onClose}/>}
        </section>
    )
}

export default BurgerIngredients;