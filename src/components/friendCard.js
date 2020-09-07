import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles({
    friend: {
        padding: 0,
        paddingLeft: 5,
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
    addIcon:{
        position: 'absolute',
        right: 10,
        padding: 8,
        //color: '#F44336',
    },
    requestSent: {
        fontSize: 10,
        position: 'absolute',
        right: 10,
        //padding: 8,
    }
});

const FriendCard = (props) => {
    const classes = useStyles();

const addFriend = () => {
    let friendship = {
        friendship:{
            friend_id: props.user.id,
            user_id: localStorage.currentUser
        }
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${localStorage.token}`
        },
        body: JSON.stringify(friendship)
    }
    fetch('http://localhost:3000/friendships/', config).then(resp => {
        return resp.json()
    }).then(friendship => {
        props.addFriends(localStorage.currentUser)
    })
}
    
    const renderButton = () => {
        if(props.friends.find(friend => friend.id === props.user.id)){
            return null
        }
        else if(props.sent.find(sent => sent.id === props.user.id)){
            return <Typography component="p" className={classes.requestSent}>
                    Request Sent
                </Typography>
        }
        else{
            return <IconButton className={classes.addIcon} onClick={addFriend}>
                    <Tooltip title="Add" placement="left">
                        <PersonAddIcon color={'primary'}/>
                    </Tooltip>
                </IconButton>
        }

    }




    return(
        <Paper className={classes.friend} elevation={0} >
                <IconButton onClick={addFriend}>
                    <Tooltip title={`${props.user.first_name}'s Profile`} placement="top-start">
                        <Avatar 
                            className={classes.avatar}
                                src={props.user.image ?
                                props.user.image.url : ""} 
                            onClick={() => props.pushProfile(props.user.id)}
                        >
                            {props.user.first_name[0]}
                        </Avatar>
                    </Tooltip>
                </IconButton>
            <Typography component="p" className={classes.friendText} gutterBottom>
                {`${props.user.first_name} ${props.user.last_name}`}
            </Typography>
            { renderButton() }

        </Paper>
    );
}

const mapStateToProps = state => {
    return {
        friends: state.friends.friends,
        sent: state.friends.sent
    }
}

export default connect(mapStateToProps)(FriendCard)