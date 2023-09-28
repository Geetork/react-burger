import { useAppSelector } from '../../utils/hooks';
import { IWSOrder } from '../../utils/types';
import styles from './feed-overall-info.module.css';

const FeedOverallInfo = () => {
    const { total, totalToday, readyOrders, inProgressOrders } = useAppSelector((store) => ({
        total: store.websocket.total,
        totalToday: store.websocket.totalToday,
        readyOrders: store.websocket.orders.filter((order: IWSOrder) => order.status === 'done'),
        inProgressOrders: store.websocket.orders.filter((order: IWSOrder) => order.status !== 'done'),
    }));

    return (
        <div className={styles.container}>
            <div className={`${styles.orders}`}>
                <div className={`${styles.order_numbers} text text_type_main-medium`}>
                    <span>Готовы:</span>
                    <div className={`${styles.scroll__container} ${styles.orders__ready}`}>
                        {
                            readyOrders.map((order: IWSOrder, id: number) => (
                                <span key={id} className='text text_type_digits-default'>{order.number}</span>
                            ))
                        }                 
                    </div>
                </div>

                <div className={`${styles.order_numbers} text text_type_main-medium`}>
                    <span>В работе:</span>
                    <div className={`${styles.scroll__container} ${styles.orders__in_progress}`}>
                        {
                            inProgressOrders.map((order: IWSOrder, id: number) => (
                                <span key={id} className='text text_type_digits-default'>{order.number}</span>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.orders__total}>
                <span className='text text_type_main-medium pt-15'>Выполнено за все время:</span>
                <span className='text text_type_digits-large'>{total}</span>
                <span className='text text_type_main-medium pt-15'>Выполнено за сегодня:</span>
                <span className='text text_type_digits-large'>{totalToday}</span>
            </div>
        </div>
    )
}

export default FeedOverallInfo;