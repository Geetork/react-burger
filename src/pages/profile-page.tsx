import { useEffect } from 'react';
import Profile from "../components/profile/profile";
import ProfileNavigation from "../components/profile/profile-navigation";
import pageStyles from './pages.module.css';
import { useDispatch } from 'react-redux';
import { SWITCH_HEADER_ITEM } from '../services/actions/navigation';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch({
            type: SWITCH_HEADER_ITEM,
            current: 'profile'
        });
    });

    return (
        <main className={pageStyles.profile__container}>
            <div className={pageStyles.profile}>
                <ProfileNavigation/>
                <Profile/>
            </div>
        </main>
    )
}

export default ProfilePage;