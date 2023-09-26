import { useEffect } from 'react';
import Profile from "../components/profile/profile";
import ProfileNavigation from "../components/profile/profile-navigation";
import pageStyles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SWITCH_HEADER_ITEM } from '../services/actions/navigation';
import Feed from '../components/feed/feed';
import { WS_HISTORY_CONNECTION_CLOSED, WS_HISTORY_CONNECTION_START } from '../services/actions/web-socket';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../utils/types';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((store: RootState) => store.navigation.profile);
    const navigate = useNavigate();
    const location = window.location.pathname;

    useEffect(() => {
        dispatch({
            type: SWITCH_HEADER_ITEM,
            current: 'profile'
        });

        navigate(location);

        return () => {
            dispatch({
                type: WS_HISTORY_CONNECTION_CLOSED,
            });
        }
    }, []);

    return (
        <main className={pageStyles.profile__container}>
            <div className={pageStyles.profile}>
                <ProfileNavigation/>
                { 
                    currentTab === 'profile' ? <Profile/> :
                        <Feed reducer='websocketHistory'/>
                }
            </div>
        </main>
    )
}

export default ProfilePage;