import React from 'react';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import {addFriends, addRequests} from '../actions/friendActions'



const useStyles = makeStyles({
    friend: {
        padding: 10,
        paddingLeft: 10,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    avatar:{
        height: 48,
        width: 48,
        fontSize: 18,
    },
    friendText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
        color: 'white',
        textAlign: 'left',
        width: 180,
        textSize: 10,
        marginTop: 0,
        fontSize: 14,
    },
    accept:{
        color: 'green',
        marginLeft: 5,
    },
    reject:{
        color: "red",
    },
    acceptCheck:{
        color: 'green'
    },
    rejectX:{
        color: "red",
    }
});


const NotificationCard = (props) => {
    const classes = useStyles();
    
    const acceptFriend = () => {
        let friendship = {
            friendship: {
                status: true
            }
        }
        let config = {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify(friendship)
        }
        fetch(`http://localhost:3000/friendships/${props.request}`, config).then(resp => {
            return resp.json()
        }).then(data => {
            props.addFriends(localStorage.currentUser)
            props.addRequests(localStorage.currentUser)
        })
    }

    const declineFriendship = () => {
        let config = {
            method: "DELETE",
            headers: {
                'Authorization': `bearer ${localStorage.token}`
            }
        }
        fetch(`http://localhost:3000/friendships/${props.request}`, config).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data)
            props.addRequests(localStorage.currentUser)
        })
    }

    return(
        
        <Paper className={classes.friend} elevation={0} >
            {   props.user.image ?
                <Avatar className={classes.avatar} src={props.user.image.url}></Avatar> :
                <Avatar className={classes.avatar}>{props.user.first_name[0]}</Avatar>}
            <p className={classes.friendText}>{ props.user.first_name + " " + props.user.last_name + " "} would like to be friends.</p>
            <IconButton className={classes.accept} onClick={acceptFriend}>
                <CheckIcon className={classes.acceptCheck} />
            </IconButton>
            <IconButton className={classes.reject} onClick={declineFriendship}>
                <ClearIcon className={classes.rejectX}/>
            </IconButton>
        </Paper>
    );
}


export default connect(null, { addFriends, addRequests })(NotificationCard)