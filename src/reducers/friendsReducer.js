function friendsReducer(state = {friends: [], sent: [], received: [], requests: [], loading: false, requestLoading: false,}, action){
    switch(action.type){
        case "LOADING_FRIENDS":
            return {...state,
                friends: [...state.friends],
                loading: true
            }
        case "ADD_FRIENDS":
            return {...state,
            loading: false,
            friends: action.friends.friends,
            sent: action.friends.sent,
            }
        case "LOADING_REQUESTS":
            return {...state,
            requests: [...state.requests],
            requestLoading: true,
            }
        case "ADD_REQUESTS":
            return {...state,
            requestLoading: false,
            requests: action.requests}
        default:
            return state
    }
}

export default friendsReducer