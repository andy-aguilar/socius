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