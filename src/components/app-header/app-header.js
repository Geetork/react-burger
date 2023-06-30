import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={appHeaderStyles.header}>
            <div className={`${appHeaderStyles.content}
                             className="text text_type_main-default"`}>
                <div className={appHeaderStyles.menu__item}>
                    <div className={appHeaderStyles.menu__first_item}>
                        <BurgerIcon />
                        <span className={`ml-2 mr-5`}>Конструктор</span>
                    </div>
                    <div className={appHeaderStyles.menu__first_item}>
                        <ListIcon />
                        <span className={`ml-2`}>Лента заказов</span>
                    </div>  
                </div>
                <div className={`${appHeaderStyles.menu__item}
                                 ${appHeaderStyles.menu__second_item}`}>
                    <Logo />  
                </div>               
                <div className={`${appHeaderStyles.menu__item}
                                 ${appHeaderStyles.menu__third_item}`}>
                    <ProfileIcon />
                    <span className={`ml-2 mr-5`}>Личный кабинет</span>
                </div>
            </div>
        </header>
    )
};

export default AppHeader;