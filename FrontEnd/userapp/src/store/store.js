import {createStore, applyMiddleware} from "redux";
import reduxThunk from 'redux-thunk';
import {persistStore} from "redux-persist";
import rootReducer from "../reducers/rootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 

const middleWares = [reduxThunk];

export const store = createStore(rootReducer,  composeEnhancers(
    applyMiddleware(...middleWares)
));

export const persistor = persistStore(store);
