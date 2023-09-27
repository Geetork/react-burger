import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './register.module.css';
import { SET_FORM_VALUE } from "../../services/actions/authorization";
import { register } from "../../services/actions/authorization";
import { AppDispatch } from "../../services/actions/navigation";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Register: React.FC = () => {
    const { name, email, pass } = useAppSelector((store) => ({
        name: store.authorization.name,
        email: store.authorization.email,
        pass: store.authorization.password
    }));

    const dispatch = useAppDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(name, email, pass));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: SET_FORM_VALUE,
            field: e.target.name,
            value: e.target.value
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
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
                            Зарегистрироваться
                        </Button>  
                    </div>
                </form>
                
                <span className={`${styles.span} text text_type_main-default mt-20 mb-4`}>
                    Уже зарегистрированы?
                    <Link to='/login' className={`${styles.link}
                        text text_type_main-default pl-2`}>
                        Войти
                    </Link>
                </span>
            </div>     
        </div>
    )
}

export default Register;