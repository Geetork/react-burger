import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    return (
        <Modal title='Детали ингредиента'
               setIsVisible={props.setIsVisible}>
            <img style={{ height: 240, width: 520}} src={props.image_large} alt='oops...'/>
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
    __v: PropTypes.number,
    setIsVisible: PropTypes.func
};

export default IngredientDetails;