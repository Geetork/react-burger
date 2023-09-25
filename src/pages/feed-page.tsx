import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Feed from '../components/feed/feed';
import FeedOverallInfo from '../components/feed-overall-info/feed-overall-info';

import styles from './pages.module.css';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/web-socket';
import { useNavigate } from 'react-router-dom';
import { SWITCH_HEADER_ITEM } from '../services/actions/navigation';

const FeedPage: React.FC = () => {
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: SWITCH_HEADER_ITEM,
            current: 'orders'
        });
        // dispatch({
        //     type: WS_CONNECTION_START
        // });
        navigate(path);

        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            });
        }
    }, []);

    return (
        <main className={styles.container}>
            <div className={styles.feed__container}>
                <Feed reducer='websocket'/>
                <FeedOverallInfo />
            </div>
        </main>
    )
} 

export default FeedPage;