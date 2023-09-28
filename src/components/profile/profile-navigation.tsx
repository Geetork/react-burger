import { Link, useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import { SWITCH_PROFILE_NAVIGATION_ITEM } from '../../services/actions/navigation';
import { logout } from '../../services/actions/authorization';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const ProfileNavigation: React.FC = () => {
    const currentTab = useAppSelector((store) => store.navigation.profile);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const switchTab = (current: string) => {
        dispatch({ 
            type: SWITCH_PROFILE_NAVIGATION_ITEM,
            current: current
        });
    }

    const signout = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <nav className={`${styles.nav} pl-5`}>
            <div className={styles.content}>
                <div className={`${styles.menu} text text_type_main-medium mt-30 mb-20`}>
                    <span className={currentTab === 'profile' ? `` : `text_color_inactive`}>
                        <Link className={styles.span}
                            onClick={() => switchTab('profile')}
                            to='/profile'>Профиль</Link>
                    </span>
                    <span className={currentTab === 'orders' ? `` : `text_color_inactive`}> 
                        <Link className={styles.span}
                            onClick={() => switchTab('orders')}
                            to='/profile/orders'>История заказов</Link>
                    </span>
                    <span className={currentTab === 'signout' ? `` : `text_color_inactive`}
                        onClick={() => {switchTab('profile')}}>
                        <Link className={styles.span}
                            onClick={signout}
                            to='/'>Выход</Link>        
                    </span>
                </div>
                <span className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>       
        </nav>
    )
}

export default ProfileNavigation;