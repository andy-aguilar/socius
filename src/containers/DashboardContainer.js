import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {fetchRuns} from '../actions/runActions';
import {connect} from 'react-redux';
import UserCard from '../components/userCard'
import FriendsContainer from '../containers/friendsContainer'
import ClubsContainer from '../containers/clubsContainer'
import DashboardRunsContainer from './dashboardRunsContainer'
import {showFilter} from '../actions/modalActions'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
        alignItems: 'center',
    },
    paperSide: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '22%',
        position: 'fixed',
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column',
    },
    gridContainer: {
        margin: "0",
        width: "100%",
        height: '100%',
    },
    spacer:{
        height: '64px',
    },
    filter:{
        color: '#F44336',
        position: 'absolute',
        right: '27.5%',
        cursor: "pointer"
    },

}));



const DashboardContainer = (props) => {
    const classes = useStyles();

    const { fetchRuns } = props

    useEffect(() => {
        fetchRuns(localStorage.currentUser)
    }, [fetchRuns, props.force])

    const pushProfile = (user) => {
        props.history.push(`/profile/${user}`)
    }


    return(
    <div className={classes.root}>
        <div className={classes.spacer} ></div>
        <Grid container
            direction="row" 
            spacing={2}
            className={classes.gridContainer}
        >
            <Grid item xs={3}>
                <Paper elevation={0} className={classes.paperSide}>
                    <UserCard pushProfile={pushProfile}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={0} className={classes.paper}>
                    <span className={classes.filter} onClick={props.showFilter}>Filter</span>
                    { props.runs.length === 0 ? <span>There are no runs to display. Tell your friends to add runs!</span> : null }
                    <DashboardRunsContainer runs={props.runs}/>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={0} className={classes.paperSide}>
                    <FriendsContainer pushProfile={pushProfile}/>
                    <ClubsContainer />
                </Paper>
            </Grid>
        </Grid>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        runs: state.runs.runs,
        force: state.runs.updating
    }
}

export default connect(mapStateToProps, { fetchRuns, showFilter })(DashboardContainer)
