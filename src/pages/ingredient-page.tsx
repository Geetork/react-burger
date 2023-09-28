import { useParams } from "react-router-dom";
import { IngredientDetailsContent } from "../components/ingredient-details/ingredient-details"
import styles from './pages.module.css';
import { IIngredient } from "../utils/types";
import { useAppSelector } from "../utils/hooks";

const IngredientPage: React.FC = () => {
    const { id } = useParams();
    
    const ingredient = useAppSelector((store) => store.ingredients.data.length ?
            store.ingredients.data.find((it: IIngredient) => it['_id'] === id) :
            null
    );

    return (
        ingredient ? 
            <main className={styles.ingredient__container}>
                <IngredientDetailsContent ingredient={ingredient} />
            </main> :
            <span>Ингредиент не найден</span>

    )
}

export default IngredientPage;