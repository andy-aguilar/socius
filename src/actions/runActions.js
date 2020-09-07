const RUNURL = 'http://localhost:3000/'

export const fetchRuns = (user) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_RUNS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch(`${RUNURL}runs/friends/${user}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_RUNS', runs: responseJSON})
        })
    }
}

export const createRun = (run) => {
    return (dispatch) => {
        dispatch({ type: 'CREATING_RUN'})
        let config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(run)
        }
        fetch(`${RUNURL}runs`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'CREATE_RUN', run: responseJSON})
        })
    }
}

export const joinRun = (userRun) => {
    return (dispatch) => {
        dispatch({type: 'JOINING_RUN'})
        let config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(userRun)
        }
        fetch(`${RUNURL}user_runs`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'UPDATE_RUN', run: responseJSON})
            dispatch({ type: 'UPDATE_USER_RUNS', run: responseJSON})
        })
    }
}

export const fetchUserRuns = (user) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER_RUNS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch(`${RUNURL}runs/user/${user}`, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_USER_RUNS', runs: responseJSON})
        })
    }
}

