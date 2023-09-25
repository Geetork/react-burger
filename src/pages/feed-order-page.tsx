import { useParams } from 'react-router-dom';
import FeedOrder from '../components/feed-order/feed-order';
import { useEffect } from 'react';

import styles from './pages.module.css';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_CLOSED,
         WS_CONNECTION_START,
         WS_HISTORY_CONNECTION_CLOSED,
         WS_HISTORY_CONNECTION_START } from '../services/actions/web-socket';

const FeedOrderPage: React.FC<{ reducer: 'websocket' | 'websocketHistory' }> = ({ reducer }) => {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: reducer === 'websocket' ?
                WS_CONNECTION_START :
                WS_HISTORY_CONNECTION_START,
        })

        return () => {
            dispatch({
                type: reducer === 'websocket' ?
                    WS_CONNECTION_CLOSED :
                    WS_HISTORY_CONNECTION_CLOSED,
            })
        }
    }, []);

    return (
        <main className={`${styles.container} mt-30`}>
            <FeedOrder reducer={reducer} id={id} />
        </main>
    )
} 

export default FeedOrderPage;