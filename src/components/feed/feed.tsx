import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed.module.css';
import { useEffect, useState } from 'react';
import { IWSOrder } from '../../utils/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import FeedOrder from '../feed-order/feed-order';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_HISTORY_CONNECTION_CLOSED, WS_HISTORY_CONNECTION_START } from '../../services/actions/web-socket';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export interface IOrder {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface IFeed {
    success: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}

interface IWSGenOrder extends IWSOrder {
    reducer: 'websocket' | 'websocketHistory';
    openModal: (id: string) => void;
}

const Order: React.FC<IWSGenOrder> = (props) => {
    const ingredients = useAppSelector((store) => store.ingredients.data);
    const [ orderIngredients, setOrderIngredients ] = useState<string[]>([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const location = useLocation();

    const ingredientsNumber = 6;

    useEffect(() => {
        const imgs: string[] = [];
        let totalPrice = 0;
        props.ingredients.forEach(ingredient => {
            const temp = ingredients.find((it) => it._id === ingredient);
            if (temp) {
                imgs.push(temp.image);
                totalPrice += temp.price;
            }
        });

        setTotalPrice(totalPrice);
        setOrderIngredients(ingredientsNumber > 5 ? imgs.slice(0, 6) : imgs);
    }, []);

    return (
        <Link to={`/${props.reducer === 'websocket' ? 'feed' : 'profile/orders'}/${props._id}`}
            className={styles.link}
            state={{ background: location }}>
            <div className={`${styles.card__container} p-6`}
                onClick={() => props.openModal(props._id)}>
                <div className={styles.card__header}>
                    <span className='text text_type_main-default'>#{props.number}</span>
                    <span className='text text_type_main-default text_color_inactive'>
                        <FormattedDate date={new Date(props.createdAt)}/>
                    </span>
                </div>
                <div className={styles.column}>
                    <span className='text text_type_main-medium'>{props.name}</span>
                    <span className={`${props.status === 'done' && styles.status} text text_type_main-default`}>
                        {props.reducer === 'websocketHistory' && props.status}
                    </span>
                </div>
                <div className={styles.card__ingredients}>
                    <div className={styles.card__images}>
                        {
                            orderIngredients.map((img, id) => {
                                const leftOffset = id * 20;
                                return (
                                    <div key={id} className={`${styles.circle_image}`} 
                                        style={{left: `-${leftOffset}px`}}>
                                        <img className={styles.image} alt='oops...' src={img}/>
                                        {
                                            id > 4 &&
                                                <span className={`${styles.image_number} text text_type_main-medium`}>
                                                    {`+${ingredientsNumber - id}`}
                                                </span>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.price}>
                        <span className='text text_type_digits-default mr-2'>{totalPrice}</span>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const Feed: React.FC<{ reducer: 'websocket' | 'websocketHistory'}> = ({ reducer }) => {
    const URL = 'wss://norma.nomoreparties.space/orders';
    const wsUrl = `${URL}/all`;
    const wsHistoryUrl = `${URL}`;

    const feed = useAppSelector((store) => store[reducer].orders);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ visibleOrderId, setVisibleOrderId ] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClose = () => {
        setIsVisible(false);
        navigate(-1);
    };

    const openModal = (id: string) => {
        setVisibleOrderId(id);
        setIsVisible(true);
    };

    useEffect(() => {
        dispatch({
            type: reducer === 'websocket' ?
                WS_CONNECTION_START :
                WS_HISTORY_CONNECTION_START,
            payload: reducer === 'websocket' ?
                wsUrl : wsHistoryUrl,
        });

        return () => {
            dispatch({
                type: reducer === 'websocket' ?
                    WS_CONNECTION_CLOSED :
                    WS_HISTORY_CONNECTION_CLOSED
            });
        }
    }, []);

    return (
        feed.length ? <div className={styles.container}>
            <span className='text text_type_main-large'>{reducer === 'websocket' && 'Лента заказов'}</span>
            <div className={styles.scroll__container}>
                <div className={`${styles.feed__cards} pt-5 pr-2`}>
                    {
                        feed.map((order: IWSOrder, id: number) => (
                            <Order 
                                reducer={reducer}
                                openModal={openModal}
                                key={id} 
                                {...order} />
                        ))
                    }
                </div>
            </div>
            { isVisible && <Modal onClose={onClose}>
                    <FeedOrder reducer={reducer} id={visibleOrderId}/>
                </Modal>}
        </div> : <></>
    )
}

export default Feed;