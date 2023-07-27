import { useParams } from "react-router-dom"
import AppHeader from "../components/app-header/app-header"
import { IngredientDetailsContent } from "../components/ingredient-details/ingredient-details"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getIngredients } from "../services/actions/burger-ingredients"
import styles from './pages.module.css';

const IngredientPage = () => {
    const { id } = useParams();
    const ingredient = useSelector(store => store.ingredients.data.length ?
            store.ingredients.data.find(it => it['_id'] === id) :
            null
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [])

    return (
        <>
            <AppHeader />
            { 
                ingredient ? 
                    <main className={styles.ingredient__container}>
                        <IngredientDetailsContent ingredient={ingredient} />
                    </main> :
                    <span>Ингредиент не найден</span>
            }
        </>
    )
}

export default IngredientPage;