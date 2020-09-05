import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    friend: {
        padding: 10,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        margin: 10,
        color: "white",
        background: "transparent",
    },
    avatar:{
        height: 48,
        width: 48,
    },
    friendText:{
        fontSize: 18,
        paddingLeft: 12,
        marginBottom: 0,
        textAlign: 'left',
    },
});

const PreviewCard = (props) => {
    const classes = useStyles();

    return(
        <Paper className={classes.friend} elevation={0} >
            <Avatar className={classes.avatar}
            alt={'preview'}
            src={props.src}
            
            ></Avatar>
            <Typography component="p" className={classes.friendText} gutterBottom>
                {`${props.firstName} ${props.lastName}`}<br/>
                {props.email}
            </Typography>
        </Paper>
    );
}


export default PreviewCard