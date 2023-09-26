import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import styles from './profile.module.css';
import { SET_FORM_VALUE, changeUserInfo, getUserInfo } from "../../services/actions/authorization";
import { useEffect } from "react";
import { RootState } from "../../utils/types";
import { AppDispatch } from "../../services/actions/navigation";

const Profile: React.FC = () => {
    const { name, email, pass } = useSelector((store: RootState) => ({
        name: store.authorization.name,
        email: store.authorization.email,
        pass: store.authorization.password
    }));

    const dispatch = useDispatch<AppDispatch>();


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_FORM_VALUE,
            field: e.target.name,
            value: e.target.value
        });
    }

    const cancel = () => {
        dispatch(getUserInfo());
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(changeUserInfo(name, email, pass));
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