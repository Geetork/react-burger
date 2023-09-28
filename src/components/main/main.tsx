import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainStyles from './main.module.css';

const Main: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={`${mainStyles.container}`}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    )
}

export default Main;