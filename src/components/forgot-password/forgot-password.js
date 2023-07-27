import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { getResetPasswordEmail } from "../../services/actions/reset-password";
import { SET_FORM_VALUE } from "../../services/actions/reset-password";
import styles from './forgot-password.module.css';

const ForgotPassword = () => {
    const value = useSelector(store => store.resetPassword.emailForgotPassword);
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        dispatch(getResetPasswordEmail(value));
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
                    placeholder={'Укажите e-mail'}
                    icon={'CurrencyIcon'}
                    onChange={onChange}
                    value={value}
                    name={'emailForgotPassword'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                    />
                <Button onClick={onClick} htmlType="button" type="primary" size="medium">
                    Восстановить
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

export default ForgotPassword;