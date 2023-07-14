import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails = ({ setIsVisible }) => {
    const ingredient = useSelector(store => store.ingredients.currentModalIngredient);

    return (
        <Modal title='Детали ингредиента'
               setIsVisible={setIsVisible}>
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
        </Modal>
    )
}

IngredientDetails.propTypes = { 
    setIsVisible: PropTypes.func.isRequired,
};

export default IngredientDetails;