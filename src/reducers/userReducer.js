function userReducer(state = { user: {}, loading: false, userStatsLoading: false, userStats: {} }, action){
    switch(action.type){
        case "LOGIN_USER":
            return state;
        case "LOADING_USER":
            return{
                ...state,
                user: {...state.user},
                loading: true,
            }
        case 'ADD_USER':
            return{
                ...state,
                user: action.user,
                loading: false
            }
        case "RESET_TO_DEFAULT":
            return {...state,
                user: {}, 
                loading: false,
                userStatsLoading: false, 
                userStats: {},
            };
        case "LOADING_USER_STATS":
            return {...state,
            userStatsLoading: true,
            }
        case "ADD_USER_STATS":
            return {...state,
            userStats: action.stats,
            userStatsLoading: false,
            }
        default:
            return state
    }
}

export default userReducer