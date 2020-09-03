function searchReducer(state = {users: [], searching: false}, action){
    switch(action.type){
        case "SEARCHING USERS":
            return {...state,
                users: [...state.users],
                searching: true
            }
        case "SEARCH USERS":
            return {...state,
            searching: false,
            users: action.users
            }
        default:
            return state
    }
}

export default searchReducer