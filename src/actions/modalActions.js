export const showCreateRunModal = () => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_CREATE_RUN_MODAL'})
    }
}

export const hideCreateRunModal = () => {
    return (dispatch) => {
        dispatch({type: 'HIDE_CREATE_RUN_MODAL'})
    }
}

export const hideCreateRunSnackBar = () => {
    return (dispatch) => {
        dispatch({type: 'HIDE_CREATE_RUN_SNACK_BAR'})
    }
}

export const hideUpdateSuccess = () => {
    return (dispatch) => {
        dispatch({type: 'HIDE_UPDATE_SUCCESS'})
    }
}

export const hideUpdateError = () => {
    return (dispatch) => {
        dispatch({type: 'HIDE_UPDATE_ERROR'})
    }
}




