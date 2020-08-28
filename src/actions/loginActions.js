export const toggleLogin = () => {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_LOGIN'})
    }
}