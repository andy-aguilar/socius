const USERURL = 'http://localhost:3000/users/'

export const fetchUser = (userId) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch(`${USERURL}${userId}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_USER', user: responseJSON})
        })
    }
}