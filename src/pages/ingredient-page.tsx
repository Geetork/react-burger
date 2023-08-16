import { useParams } from "react-router-dom";
import { IngredientDetailsContent } from "../components/ingredient-details/ingredient-details"
import { useSelector } from "react-redux"
import styles from './pages.module.css';
import { IIngredient } from "../utils/types";

const IngredientPage: React.FC = () => {
    const { id } = useParams();
    
    const ingredient = useSelector((store: any) => store.ingredients.data.length ?
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