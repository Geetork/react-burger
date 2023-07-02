import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientPropTypes } from "../../utils/prop-types";

const IngredientDetails = (props) => {
    return (
        <Modal title='Детали ингредиента'
               setIsVisible={props.setIsVisible}>
            <img className={ingredientDetailsStyles.img} src={props.image_large} alt='oops...'/>
            <span className="text text_type_main-medium mt-4 mb-8">
                {props.name}
            </span>
            <div className={`${ingredientDetailsStyles.specification}
                            text text_type_main-default mb-5`}>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Калории, ккал</span>
                    <span className="text text_type_digits-default">
                        {props.calories}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">
                        {props.fat}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">
                        {props.proteins}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {props.carbohydrates}
                    </span>
                </div>
            </div>
        </Modal>
    )
}

IngredientDetails.propTypes = { 
    ...ingredientPropTypes,
    setIsVisible: PropTypes.func.isRequired
};

export default IngredientDetails;