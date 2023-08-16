import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { SWITCH_HEADER_ITEM } from '../../services/actions/navigation';
import { useDispatch, useSelector } from 'react-redux';
import appHeaderStyles from './app-header.module.css';

const AppHeader: React.FC = () => {
    const current = useSelector((store: any) => store.navigation.header);
    const dispatch = useDispatch();

    const switchTab = (current: string) => {
        dispatch({ 
            type: SWITCH_HEADER_ITEM,
            current: current
        });
    }

    return (
        <header className={appHeaderStyles.header}>
            <div className={`${appHeaderStyles.content}
                             className="text text_type_main-default"`}>
                <div className={appHeaderStyles.menu__item}>
                    <div className={appHeaderStyles.menu__first_item}>
                        <BurgerIcon type='primary'/>
                        <span className={current === 'constructor' ? `ml-2 mr-5` : `ml-2 mr-5 text_color_inactive`}>
                            <Link className={appHeaderStyles.button} to='/'
                                onClick={() => switchTab('constructor')}>Конструктор</Link>
                        </span>                    
                    </div>
                    <div className={appHeaderStyles.menu__first_item}>
                        <ListIcon type='primary'/>
                        <span className={current === 'orders' ? `ml-2` : `ml-2 text_color_inactive`}>
                            <Link className={appHeaderStyles.button} to='/'
                                onClick={() => switchTab('orders')}>Лента заказов</Link>
                        </span> 
                    </div>  
                </div>
                <div className={`${appHeaderStyles.menu__item}
                                 ${appHeaderStyles.menu__second_item}`}>
                    <Link to='/' onClick={() => switchTab('constructor')}><Logo /></Link>
                </div>               
                <div className={`${appHeaderStyles.menu__item}
                                 ${appHeaderStyles.menu__third_item}`}>
                    <ProfileIcon type='primary'/>
                    <span className={current === 'profile' ? `ml-2 mr-5` : `ml-2 mr-5 text_color_inactive`}>
                        <Link className={appHeaderStyles.button} to='/profile'
                            onClick={() => switchTab('profile')}>Личный кабинет</Link>
                    </span>  
                </div>
            </div>
        </header>
    )
};

export default AppHeader;