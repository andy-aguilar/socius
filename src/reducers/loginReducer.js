function loginReducer(state = true, action){
    switch(action.type){
        case "TOGGLE_LOGIN":
            return !state;
        case "RESET_TO_DEFAULT":
            return true
        default:
            return state
    }
}

export default loginReducer