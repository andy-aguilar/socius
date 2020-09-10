export const toggleLogin = () => {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_LOGIN'})
    }
}

export const loginUser = (user) => {
    return(dispatch) => {
        dispatch({type: 'LOGIN_USER', user})
    }
}

export const logoutUser = () => {
    return(dispatch) => {
        dispatch({type: 'RESET_TO_DEFAULT'})
    }
}