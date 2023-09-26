import ReactDOM from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';

import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { wsActions, wsHistoryActions } from './services/actions/web-socket';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,
    socketMiddleware(wsActions),
    socketMiddleware(wsHistoryActions))));

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);