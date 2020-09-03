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
        marginBottom: 20,
    },
    title: {
        fontSize: '28px',
        lineHeight: '50px',
        backgroundColor: '#bdbdbd',
        color: 'white',
    },
    pos: {
        marginBottom: 12,
    },
    friend: {
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
    friends:{
        height: 220,
        overflow: "scroll",
    },
    friendText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
    }
});

const FriendsContainer = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardContent style={{padding: '0px', paddingRight: '0px', paddingLeft: '0px'}}>
            <Typography variant="h4" component="h2" className={classes.title} gutterBottom>
            Friends
            </Typography>
            <div className={classes.friends}>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>T</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    This
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>I</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Is
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>W</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Where
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>Y</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Your
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>F</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Friends
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>W</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Would
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>G</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Go
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>I</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    If
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>Y</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    You
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>H</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Had
                </Typography>
            </Paper>
            <Paper className={classes.friend} elevation={0} >
                <Avatar className={classes.avatar}>A</Avatar>
                <Typography component="p" className={classes.friendText} gutterBottom>
                    Any
                </Typography>
            </Paper>
            </div>
        </CardContent>
        <CardActions>
            <Button size="small">Find Friends</Button>
        </CardActions>
        </Card>
    );
}

export default FriendsContainer