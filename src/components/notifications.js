import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import NotificationCard from './notificationCard';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container:{
        width: 350,
        backgroundColor: "#000000f0",
        position: 'absolute',
        top: 50,
        right: 140,
        zIndex: 10,
        borderRadius: 5,
    },
    noNotification: {
        color: 'white',
        marginTop: 40,
        marginBottom: 40,
    }
})

const Notifications = (props) => {

    const classes = useStyles();

    const renderRequests = () => {
        if(props.requests.length > 0){
            return props.requests.map(request => <NotificationCard key={request.id} user={request.userObj} request={request.id} />)
        }
        else{
            return <Typography component="p" className={classes.noNotification}>No notifications...</Typography>
        }
    }


    return (
        <div className={classes.container}>
            {props.requestLoading ? 
            <CircularProgress /> :
            renderRequests()
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        requests: state.friends.requests,
        requestLoading: state.friends.requestLoading,
    }
}


export default connect(mapStateToProps)(Notifications)