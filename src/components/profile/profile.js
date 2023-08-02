import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";

import styles from './profile.module.css';
import { SET_FORM_VALUE, changeUserInfo, getUserInfo } from "../../services/actions/authorization";
import { useEffect } from "react";

const Profile = () => {
    const { name, email, pass } = useSelector(store => ({
        name: store.authorization.name,
        email: store.authorization.email,
        pass: store.authorization.password
    }));

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const onChange = (e) => {
        dispatch({
            type: SET_FORM_VALUE,
            field: e.target.name,
            value: e.target.value
        });
    }

    const cancel = () => {
        dispatch(getUserInfo());
    }

    const onSubmit = (e) => {
        dispatch(changeUserInfo(name, email, pass));
        console.log(navigate);
    }

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <div className={styles.container}>
            <div className={`${styles.wrapper} mt-30`}>
                <form onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        icon={'CurrencyIcon'}
                        onChange={onChange}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                        />
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        icon={'CurrencyIcon'}
                        onChange={onChange}
                        value={email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                        />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        icon={'CurrencyIcon'}
                        onChange={onChange}
                        value={pass}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                        />
                    <div className={styles.buttons}>
                        <Button onClick={cancel} htmlType="button" type="primary" size="small">
                            Отмена
                        </Button> 
                        <Button htmlType="submit" type="primary" size="small">
                            Сохранить
                        </Button> 
                    </div>
                </form>
            </div>    
        </div>
    )
}

export default Profile;