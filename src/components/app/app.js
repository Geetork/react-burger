import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../utils/data';

import appStyles from './app.module.css';

const App = () => {

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Main data={data}/>
        </div>
    )
}

export default App;