import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
    friendText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
    },
});

const FriendCard = (props) => {
    const classes = useStyles();
    


    return(
        <Paper className={classes.friend} elevation={0} >
            <Avatar className={classes.avatar}>{props.user.first_name[0]}</Avatar>
            <Typography component="p" className={classes.friendText} gutterBottom>
                {`${props.user.first_name} ${props.user.last_name}`}
            </Typography>
        </Paper>
    );
}


export default FriendCard