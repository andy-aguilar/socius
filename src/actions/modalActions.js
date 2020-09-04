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

export const showEditUserModal = () => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_EDIT_USER_MODAL'})
    }
}

export const hideEditUserModal = () => {
    return (dispatch) => {
        dispatch({ type: 'HIDE_EDIT_USER_MODAL'})
    }
}

export const hideEditUserError = () => {
    return (dispatch) => {
        dispatch({ type: 'HIDE_EDIT_USER_ERROR'})
    }
}

export const hideEditUserSuccess = () => {
    return (dispatch) => {
        dispatch({ type: 'HIDE_EDIT_USER_SUCCESS'})
    }
}

export const showNotifications = () => {
    return (dispatch) => {
        dispatch({type: 'SHOW_NOTIFICATIONS'})
    }
}
export const hideNotifications = () => {
    return (dispatch) => {
        dispatch({type: 'HIDE_NOTIFICATIONS'})
    }
}






