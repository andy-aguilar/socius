import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import runReducer from './runReducer';
import modalReducer from './modalReducer';
import searchReducer from './searchReducer';
import friendsReducer from './friendsReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    runs: runReducer,
    modals: modalReducer,
    search: searchReducer,
    friends: friendsReducer,
})

export default rootReducer