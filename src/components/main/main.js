import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainStyles from './main.module.css';

const Main = (props) => {
    return (
        <main className={`${mainStyles.container}`}>
            <BurgerIngredients data={props.data}/>
            <BurgerConstructor />
        </main>
    )
}

Main.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
       _id: PropTypes.string,
       name: PropTypes.string,
       type: PropTypes.string,
       proteins: PropTypes.number,
       fat: PropTypes.number,
       carbohydrates: PropTypes.number,
       calories: PropTypes.number,
       price: PropTypes.number,
       image: PropTypes.string,
       image_mobile: PropTypes.string,
       image_large: PropTypes.string,
       __v:0
    })).isRequired
};

export default Main;