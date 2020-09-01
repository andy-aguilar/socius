import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {fetchRuns} from '../actions/runActions';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardRun from '../components/dashboardRun'

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
        height: '50%',
        position: 'fixed',
        alignItems: 'center',
    },
    gridContainer: {
        margin: "0",
        width: "100%",
        height: '100%',
    },
    spacer:{
        height: '64px',
    }
}));

const DashboardContainer = (props) => {
    const classes = useStyles();

    const { fetchRuns } = props

    useEffect(() => {
        fetchRuns()
    }, [fetchRuns])

    const renderRuns = () => {
        //props.runs.runs.map(run => <li>{run.name}</li>)
        return (props.runs.loading ? <CircularProgress /> : props.runs.runs.map(run => <DashboardRun key={run.id} run={run}/>))
        
    }


    return(
    <div className={classes.root}>
        <div className={classes.spacer}></div>
        <Grid container
            direction="row" 
            spacing={2}
            className={classes.gridContainer}
        >
            <Grid item xs={3}>
                <Paper elevation={3} className={classes.paperSide}>xs=3</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} className={classes.paper}>{renderRuns()}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={3} className={classes.paperSide}>xs=3</Paper>
            </Grid>
        </Grid>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        runs: state.runs
    }
}

export default connect(mapStateToProps, { fetchRuns })(DashboardContainer)
