const FRIENDSURL = 'http://localhost:3000/friendships/'

export const addFriends = (userId) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_FRIENDS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            },
        }
        fetch(`${FRIENDSURL}${userId}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_FRIENDS', friends: responseJSON})
        })
    }
}

export const addRequests = (userId) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_REQUESTS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            },
        }
        fetch(`${FRIENDSURL}requests/${userId}`, config).then(resp => {
            return resp.json()
        }).then(requests => {
            dispatch({ type: 'ADD_REQUESTS', requests: requests})
        })
    }
}