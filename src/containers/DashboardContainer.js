import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '90%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '98%',
    },
    gridContainer: {
        margin: "0",
        width: "100%",
        height: '100%',
    }
}));

const DashboardContainer = (props) => {
    const classes = useStyles();
    return(
    <div className={classes.root}>
        <Grid container
            direction="row" 
            spacing={2}
            className={classes.gridContainer}
        >
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
    </div>
    )
}

export default DashboardContainer
