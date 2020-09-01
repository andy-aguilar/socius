function runReducer(state = { runs: [], loading: false, creating: false, updating: false, runCreator: "", errorMessage: "" }, action){
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
                runs: action.runs,
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
        default:
            return state;
    }
}

export default runReducer