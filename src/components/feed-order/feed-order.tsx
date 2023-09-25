import { useLocation, useParams } from 'react-router-dom';
import styles from './feed-order.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, IWSOrder } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import { SWITCH_HEADER_ITEM } from '../../services/actions/navigation';

interface IFeedOrder {
    order: IWSOrder;
}

const getIngredientsFrequency = (ingredients: string[]) => {
    let dict: { [key: string]: number } = {};

    ingredients.forEach((ingredient) => {
        ingredient && (
            dict[ingredient] ? dict[ingredient] += 1 : dict[ingredient] = 1);
    });

    return dict;
};

const getIngredientsWithQuantity = (ids: string[], ingredients: IIngredient[]) => {
    const dict = getIngredientsFrequency(ids);
    let ans = [];

    for (let id in dict) {
        const ingredient = ingredients.find((it: IIngredient) => it._id === id);
        ans.push({ ...ingredient, count: dict[id] });
    };
    
    return ans;
};

const FeedOrder: React.FC<{ reducer: 'websocket' | 'websocketHistory',
                            id: string | undefined}> = ({ reducer, id }) => {
    const dispatch = useDispatch();
    const order = useSelector((store: any) => store[reducer].orders.length ?
            store[reducer].orders.find((it: IWSOrder) => it['_id'] === id) :
            null
    );

    const ingredients = useSelector((store: any) => store.ingredients.data);
    const ingredientsWithQuantity = order ? getIngredientsWithQuantity(order.ingredients, ingredients) : null;

    const getTotalPrice = useMemo(() => {
        return ingredientsWithQuantity?.reduce((acc, it) => 
            acc += (it.price as number) * (it.count as number), 0);
    }, [ingredientsWithQuantity]);

    useEffect(() => {
        dispatch({
            type: SWITCH_HEADER_ITEM,
            current: reducer === 'websocket' ?
                'orders' : 'profile'
        });
    }, []);

    return (
        order && <div className={styles.container}>
            <div className={styles.order__details}>
                <span className={`${styles.order__number} text text_type_digits-default mb-10`}>#{order.number}</span>
                <span className="text text_type_main-medium mb-3">{order.name}</span>
                <span className={`${styles.status} text text_type_main-default mb-15`}>{order.status}</span>
                <span className="text text_type_main-medium mb-6">Состав:</span>
                <div className={styles.scroll__container}>
                    <div className={styles.ingredients}>
                        {
                            ingredientsWithQuantity?.map((it, id) => (
                                <div key={id} className={styles.ingredient__card}>
                                    <div className={styles.circle_image}>
                                        <img className={styles.image} src={it.image_mobile} alt="oops..." />
                                    </div>
                                    <div className={styles.row}>
                                        <span className='text text_type_main-default'>{it.name}</span>
                                        <div className={`${styles.price} text text_type_digits-default mr-2`}>
                                            <span className='mr-2'>{it.count} x</span>
                                            <span className='mr-2'>{it.price}</span>
                                            <CurrencyIcon type='primary' />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`${styles.row} mt-10`}>
                    <span className='text text_type_main-default text_color_inactive'>
                        <FormattedDate date={new Date(order.createdAt)}/>
                    </span>
                    <div className={styles.price}>
                        <span className='text text_type_digits-default mr-2'>{getTotalPrice}</span>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedOrder;