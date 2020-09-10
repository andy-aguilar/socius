function searchReducer(state = {users: [], searching: false}, action){
    switch(action.type){
        case "SEARCHING_USERS":
            return {...state,
                users: [...state.users],
                searching: true
            }
        case "SEARCH_USERS":
            return {...state,
            searching: false,
            users: action.users
            }
        case 'CLEAR_SEARCH':
            return {...state,
            users: []
            }
        case "RESET_TO_DEFAULT":
            return {...state, users: [], searching: false}
        default:
            return state
    }
}

export default searchReducer