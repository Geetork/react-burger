import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const TotalPrice = () => {
    const constructorIngredients = useSelector(store => 
        store.constructorIngredients);

    const totalPrice = useMemo(() => {
        const ingredients = constructorIngredients
            .constructorIngredients.reduce((acc, ingredient) => (
            acc += ingredient.price
        ), 0);
        const bun = Object.keys(constructorIngredients.bun).length === 0 ? 0 :
            constructorIngredients.bun.price * 2;

        return ingredients + bun;
    }, [constructorIngredients])

    return (
        <span className="text text_type_main-large mr-10">
            <span className="text text_type_main-large pr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
        </span>
    )
};

export default TotalPrice;