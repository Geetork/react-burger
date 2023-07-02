import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../utils/api';

import appStyles from './app.module.css';

const App = () => {
    const [state, setState] = useState({
        hasError: false,
        data: []
      });

    useEffect(() => {
        getIngredients()
        .then(data => setState({
            hasError: false,
            data: data
        }))
        .catch((e) => setState({
            ...state,
            hasError: true,
        }));
    }, []);

    return (
        <div className={appStyles.app}>
            {state.hasError && 
                <span className="text text_type_main-large">
                    Произошла ошибка...
                </span>
            }
            {!state.hasError && state.data.length &&
                <>
                    <AppHeader />
                    <Main data={state.data}/>
                </> 
            }    
        </div>
    )
}

export default App;