import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import runReducer from './runReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    runs: runReducer,
    modals: modalReducer,
})

export default rootReducer