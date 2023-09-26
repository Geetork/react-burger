import { IIngredient, RootState } from '../../utils/types';
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const TotalPrice: React.FC = () => {
    const constructorIngredients = useSelector((store: RootState) => 
        store.constructorIngredients);

    const totalPrice = useMemo(() => {
        const ingredients = constructorIngredients
            .constructorIngredients.reduce((acc: number, ingredient: IIngredient) => (
            acc += ingredient.price
        ), 0);
        const bun = !constructorIngredients.bun ? 0 :
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