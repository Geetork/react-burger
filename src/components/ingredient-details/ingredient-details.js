import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ingredientPropTypes } from "../../utils/prop-types";
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useLocation, useNavigate } from "react-router-dom";

export const IngredientDetailsContent = ({ ingredient }) => {
    return (
        <>
            <img className={ingredientDetailsStyles.img} src={ingredient.image_large} alt='oops...'/>
            <span className="text text_type_main-medium mt-4 mb-8">
                {ingredient.name}
            </span>
            <div className={`${ingredientDetailsStyles.specification}
                            text text_type_main-default mb-5`}>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Калории, ккал</span>
                    <span className="text text_type_digits-default">
                        {ingredient.calories}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient.fat}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient.proteins}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient.carbohydrates}
                    </span>
                </div>
            </div>
        </>
    )
}

IngredientDetailsContent.propTypes = {
    ingredient: PropTypes.shape({ ...ingredientPropTypes }).isRequired,
}

const IngredientDetails = ({ onClose }) => {
    const ingredient = useSelector(store => store.ingredients.currentModalIngredient);
    
    return (
        <Modal title='Детали ингредиента'
            onClose={onClose}>
            <IngredientDetailsContent ingredient={ingredient}/>
        </Modal>
    )
}

IngredientDetails.propTypes = { 
    onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;