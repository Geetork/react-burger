import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';
import { useDispatch, useSelector } from "react-redux";
import { SET_FORM_VALUE, resetPassword } from "../../services/actions/reset-password";

const ResetPassword = () => {
    const { pass, code } = useSelector(store => ({
        pass: store.resetPassword.passwordReset,
        code: store.resetPassword.emailCode
    }));

    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        dispatch(resetPassword(pass, code));
    }
    const onChange = (e) => {
        dispatch({
            type: SET_FORM_VALUE,
            field: e.target.name,
            value: e.target.value
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    icon={'CurrencyIcon'}
                    onChange={onChange}
                    value={pass}
                    name={'passwordReset'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                    />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    icon={'CurrencyIcon'}
                    onChange={onChange}
                    value={code}
                    name={'emailCode'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                    />
                <Button onClick={onClick} htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>  
                <span className={`${styles.span} text text_type_main-default mt-20 mb-4`}>
                    Вспомнили пароль?
                    <Link to='/login' className={`${styles.link}
                        text text_type_main-default pl-2`}>
                        Войти
                    </Link>
                </span> 
            </div>    
        </div>
    )
}

export default ResetPassword;