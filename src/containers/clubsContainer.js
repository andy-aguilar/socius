import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    root: {
        minWidth: 320,
    },
    title: {
        fontSize: '28px',
    },
    pos: {
        marginBottom: 12,
    },
    club: {
        padding: 10,
        paddingLeft: 20,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',


    },
    avatar:{
        height: 24,
        width: 24,
        fontSize: 18,
    },
    clubs:{
        height: 220,
        overflow: "scroll",
    },
    clubText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
    }
});

const ClubsContainer = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardContent style={{padding: '10px', paddingRight: '0px', paddingLeft: '0px'}}>
            <Typography variant="h4" component="h2" className={classes.title} gutterBottom>
                Clubs
            </Typography>
            <div className={classes.clubs}>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>Y</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    You
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>C</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Could
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>A</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Also
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>J</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Join
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>C</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Clubs
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>I</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    If
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>Y</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    You
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>W</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Weren't
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>S</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    So
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar}>L</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Lazy
                </Typography>
            </Paper>
            </div>
        </CardContent>
        <CardActions>
            <Button size="small">Find clubs</Button>
        </CardActions>
        </Card>
    );
}

export default ClubsContainer