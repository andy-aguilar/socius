function modalReducer(state = {createRun: false}, action){
    switch(action.type){
        case "SHOW_CREATE_RUN_MODAL":
            return {...state, createRun: true}
        case "HIDE_CREATE_RUN_MODAL":
            return {...state, createRun: false}
        default:
            return state
    }
}

export default modalReducer