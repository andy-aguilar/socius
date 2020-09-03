function modalReducer(state = {createRun: false, createSnackBar: false, updateSuccess: false, updateError: false, editUser: false, }, action){
    switch(action.type){
        case "SHOW_CREATE_RUN_MODAL":
            return {...state, createRun: true}
        case "HIDE_CREATE_RUN_MODAL":
            return {...state, createRun: false}
        case 'CREATE_RUN':
            return {...state, createSnackBar: true}
        case 'HIDE_CREATE_RUN_SNACK_BAR':
            return {...state, createSnackBar: false}
        case 'UPDATE_RUN':
            if (action.run.error){
                return {...state, updateError: true}
            }
            else{
                return {...state, updateSuccess: true}
            }
        case 'HIDE_UPDATE_ERROR':
            return {...state, updateError: false}
        case 'HIDE_UPDATE_SUCCESS':
            return {...state, updateSuccess: false}
        case 'SHOW_EDIT_USER_MODAL':
            return {...state, editUser: true}
        case 'HIDE_EDIT_USER_MODAL':
            return {...state, editUser: false}
        default:
            return state
    }
}

export default modalReducer