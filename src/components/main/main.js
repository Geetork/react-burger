import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientPropTypes } from '../../utils/prop-types';

import mainStyles from './main.module.css';

const Main = (props) => {
    return (
        <main className={`${mainStyles.container}`}>
            <BurgerIngredients data={props.data}/>
            <BurgerConstructor data={props.data}/>
        </main>
    )
}

Main.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({ ...ingredientPropTypes })).isRequired
};

export default Main;