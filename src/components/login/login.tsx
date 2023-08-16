import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './login.module.css';
import { login, SET_FORM_VALUE } from "../../services/actions/authorization";

const Login: React.FC = () => {
    const { email, pass } = useSelector((store: any) => ({
        email: store.authorization.email,
        pass: store.authorization.password
    }));
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        dispatch(login(email, pass));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_FORM_VALUE,
            field: e.target.name,
            value: e.target.value
        });
    }; 

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <h1 className='text text_type_main-medium mb-6'>Вход</h1>
                <form onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
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
                        <Button htmlType="submit" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
                  
                <span className={`${styles.span} text text_type_main-default mt-20 mb-4`}>
                    Вы - новый пользователь?
                    <Link to='/register' className={`${styles.link}
                        text text_type_main-default pl-2`}>
                        Зарегистрироваться
                    </Link>
                </span> 
                <span className={`${styles.span} text text_type_main-default mb-4`}>
                    Забыли пароль?
                    <Link to='/forgot-password' className={`${styles.link}
                        text text_type_main-default pl-2`}>
                        Восстановить пароль
                    </Link>
                </span>
            </div>      
        </div>
    )
}

export default Login;