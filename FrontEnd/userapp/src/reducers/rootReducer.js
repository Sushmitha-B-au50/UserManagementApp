import {combineReducers} from 'redux';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
 import {userReducer} from "../reducers/userReducer";

const persistConfig = {
    key:"root",
    storage,
    whiteList:["userRed"]
}

const rootReducer = combineReducers({
    userRed: userReducer,
  });

export default persistReducer(persistConfig,rootReducer);