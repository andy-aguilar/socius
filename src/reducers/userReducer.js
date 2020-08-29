function userReducer(state = {}, action){
    switch(action.type){
        case "LOGIN_USER":
            debugger
            return action.user;
        default:
            return state
    }
}

export default userReducer