import { useLocation, useParams } from "react-router-dom"
import AppHeader from "../components/app-header/app-header"
import { IngredientDetailsContent } from "../components/ingredient-details/ingredient-details"
import { useSelector } from "react-redux"
import styles from './pages.module.css';

const IngredientPage = () => {
    const { id } = useParams();
    
    const ingredient = useSelector(store => store.ingredients.data.length ?
            store.ingredients.data.find(it => it['_id'] === id) :
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