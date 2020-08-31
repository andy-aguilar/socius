const RUNURL = 'http://localhost:3000/runs'

export const fetchRuns = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_RUNS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch(RUNURL, config).then(response => {
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
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(run)
        }
        fetch(RUNURL, config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'CREATE_RUN', runs: responseJSON})
        })
    }
}