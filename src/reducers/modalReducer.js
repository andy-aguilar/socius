function modalReducer(state = {createRun: false, createSnackBar: false }, action){
    switch(action.type){
        case "SHOW_CREATE_RUN_MODAL":
            return {...state, createRun: true}
        case "HIDE_CREATE_RUN_MODAL":
            return {...state, createRun: false}
        case 'CREATE_RUN':
            return {...state, createSnackBar: true}
        case 'HIDE_CREATE_RUN_SNACK_BAR':
            return {...state, createSnackBar: false}
        default:
            return state
    }
}

export default modalReducer