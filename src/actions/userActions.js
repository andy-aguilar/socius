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

export const updateUser = (editedUser, id) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        let config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedUser)
        }
        fetch(`${USERURL}${id}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_USER', user: responseJSON})
            dispatch({ type: 'UPDATE_USER', user: responseJSON})
        })
    }
}

export const fetchUserStats = (id) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER_STATS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch(`http://localhost:3000/runs/userstats/${id}`, config).then(resp => {
            return resp.json()
        }).then(stats => {
            dispatch({type: 'ADD_USER_STATS', stats: stats})
        })
    }
}