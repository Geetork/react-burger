import { IIngredient } from "../../utils/types";
import Modal from "../modal/modal";
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useAppSelector } from "../../utils/hooks";

interface IIngredientDetails {
    ingredient: IIngredient | null;
}

export const IngredientDetailsContent: React.FC<IIngredientDetails> = ({ ingredient }) => {
    return (
        <>
            <img className={ingredientDetailsStyles.img} src={ingredient?.image_large} alt='oops...'/>
            <span className="text text_type_main-medium mt-4 mb-8">
                {ingredient?.name}
            </span>
            <div className={`${ingredientDetailsStyles.specification}
                            text text_type_main-default mb-5`}>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Калории, ккал</span>
                    <span className="text text_type_digits-default">
                        {ingredient?.calories}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient?.fat}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient?.proteins}
                    </span>
                </div>
                <div className={ingredientDetailsStyles.specification__item}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient?.carbohydrates}
                    </span>
                </div>
            </div>
        </>
    )
}

const IngredientDetails: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const ingredient = useAppSelector((store) => store.ingredients.currentModalIngredient);
    
    return (
        <Modal title='Детали ингредиента'
            onClose={onClose}>
            <IngredientDetailsContent ingredient={ingredient}/>
        </Modal>
    )
}

export default IngredientDetails;