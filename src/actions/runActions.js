export const fetchRuns = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_RUNS'})
        let config = {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        }
        fetch('http://localhost:3000/runs', config).then(response => {
            return response.json()
        }).then(responseJSON => {
            dispatch({ type: 'ADD_RUNS', runs: responseJSON})
        })
    }
}