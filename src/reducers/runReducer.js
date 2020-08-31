function runReducer(state = {runs: [], loading: false}, action){
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
        default:
            return state;
    }
}

export default runReducer