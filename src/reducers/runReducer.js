function runReducer(state = { runs: [], 
    loading: false, 
    offset: 0, 
    creating: false, 
    updating: false, 
    runCreator: "", 
    errorMessage: "", 
    userRuns: [], 
    loadingUserRuns: false, 
    userHistory: [], 
    updatingHistory: false 
}, action){
    switch(action.type){
        case 'LOADING_RUNS':
            return {
                ...state,
                runs: [...state.runs],
                loading: true
            }
        case "ADD_RUNS":
            return {
                ...state, 
                runs: [...state.runs, ...action.runs],
                offset: state.offset + 3,
                loading: false,
            }
        case "CREATING_RUN":
            return{
                ...state,
                runs: [...state.runs],
                creating: true
            }
        case "CREATE_RUN":
            return{...state,
                runs: [...state.runs, action.run],
                creating: false
            }
        case "JOINING_RUN":
            return {...state,
                updating: true
            }
        case "UPDATE_RUN":
            if (action.run.error){
                return {...state, 
                    updating: false, 
                    errorMessage: action.run.error
                }
            }
            else{
                const runIndex = state.runs.findIndex(run => run.id === action.run.id)
                const newRuns = [...state.runs]
                newRuns[runIndex] = action.run
                return {...state,
                    runs: newRuns,
                    updating: false,
                    runCreator: action.run.users.find(user => user.id === action.run.user_owner_id).first_name
                }
            }
        case "LOADING_USER_RUNS":
            return {
                ...state,
                userRuns: [...state.userRuns],
                loadingUserRuns: true
            }
        case "ADD_USER_RUNS":
            return {
                ...state,
                userRuns: action.runs,
                loadingUserRuns: false,
            }
        case "UPDATE_USER_RUNS":
            if (action.run.error){
                return {...state, 
                    updating: false, 
                    errorMessage: action.run.error
                }
            }
            else{
                const runIndex = state.userRuns.findIndex(run => run.id === action.run.id)
                const newRuns = [...state.userRuns]
                newRuns[runIndex] = action.run
                return {...state,
                    userRuns: newRuns,
                    updating: false,
                    //runCreator: action.run.users.find(user => user.id === action.run.user_owner_id).first_name
                }
            }
        case "LOADING_USER_HISTORY":
            return {
                ...state, 
                updatingHistory: true,
                userHistory: [...state.userHistory]
            }
        case "ADD_USER_HISTORY":
            return {
                ...state,
                userHistory: action.runs,
                updatingHistory: false,
            }
        case 'RESET_TO_DEFAULT':
            return {...state, runs: [], 
                loading: false, 
                offset: 0, 
                creating: false, 
                updating: false, 
                runCreator: "", 
                errorMessage: "", 
                userRuns: [], 
                loadingUserRuns: false, 
                userHistory: [], 
                updatingHistory: false 
            }
        default:
            return state;
    }
}

export default runReducer