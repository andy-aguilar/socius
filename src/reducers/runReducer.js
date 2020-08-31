function runReducer(state = {runs: [], loading: false, creating: false}, action){
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
        default:
            return state;
    }
}

export default runReducer