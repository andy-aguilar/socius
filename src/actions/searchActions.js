const SEARCHURL = 'http://localhost:3000/search/'

export const searchUsers = (query) => {
    return (dispatch) => {
        dispatch({ type: 'SEARCHING_USERS'})
        let config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
        }
        fetch(`${SEARCHURL}${query}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'SEARCH_USERS', user: responseJSON})
        })
    }
}
