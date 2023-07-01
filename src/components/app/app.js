import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';

import appStyles from './app.module.css';

const App = () => {
    const [data, setData] = useState([]);

    const URL = 'https://norma.nomoreparties.space/api/ingredients';

    useEffect(() => {
        fetch(URL)
        .then(res => (res.json()))
        .then(data => setData(data.data))
        .catch(err => { console.log(err) });
    }, []);

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Main data={data}/>
        </div>
    )
}

export default App;