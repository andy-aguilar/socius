import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/userActions';
import {fetchUserRuns} from '../actions/runActions'
import trackimage from '../images/trackimage.jpg';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import ProfileRun from '../components/profileRun';
import ProfileRunsContainer from './profileRunsContainer'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    bottom: {
        display: 'flex',
        flexFlow: 'row',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10,
        marginBottom: 10,
        flexGrow: 1,
        flexShrink: 1,
    },
    header: {
        backgroundImage: `url(${trackimage})`,
        height: 200,
        margin: 10,
        marginLeft: 100,
        marginRight: 100,
        marginTop: 80,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        boxShadow: '2px 4px 6px #888888'
    },
    spacer: {
        height: 64,
    },
    avatar: {
        height: 200,
        width: 200,
    },
    buttons: {
        marginLeft: 100,
        marginTop: 10,
        width: 480,
    },
    button: {
        width: 120,
    },
    bottomLeft:{
        height: '100%',
        width: '60%',
        marginRight: 10,
        paddingTop: 10,
    },
    bottomRight:{
        height: '100%',
        width: '40%',
        marginRight: 10,
    }

}));

const ProfileContainer = (props) => {
    const classes = useStyles();
    const [runsClicked, setRunsClicked] = useState(true)
    const [friendsClicked, setFriendsClicked] = useState(false)
    const [calendarClicked, setCalendarClicked] = useState(false)
    const [historyClicked, setHistoryClicked] = useState(false)

    useEffect(() => {
        props.fetchUser(props.match.params.id)
        props.fetchUserRuns(props.match.params.id)
    }, [])

    const handleClick = (button) => {
        setRunsClicked(false)
        setFriendsClicked(false)
        setCalendarClicked(false)
        setHistoryClicked(false)
        if(button === "Runs"){
            setRunsClicked(true)
        }
        else if( button === "Calendar"){
            setCalendarClicked(true)
        }
        else if( button === "Friends"){
            setFriendsClicked(true)
        }
        else{
            setHistoryClicked(true)
        }
    }

    return(
        <div className={classes.root}>
            <div className={classes.spacer}></div>
            <div className={classes.header}>
            <Avatar
                alt={props.user.user.first_name}
                src={props.user.user.image ? props.user.user.image.url : ""}
                className={classes.avatar}>
                No Image
            </Avatar>
            </div>
                <ButtonGroup className={classes.buttons} variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button className={classes.button}
                        style={ runsClicked ?
                            {backgroundColor: '#144475'} :
                            {} 
                        }
                        onClick={(e) => handleClick(e.target.textContent)} 
                    >
                        Runs
                    </Button>
                    <Button className={classes.button}
                        style={ calendarClicked ?
                            {backgroundColor: '#144475'} :
                            {} 
                        }
                        onClick={(e) => handleClick(e.target.textContent)} 
                    >
                        Calendar
                    </Button>
                    <Button className={classes.button}
                        style={ friendsClicked ?
                            {backgroundColor: '#144475'} :
                            {} 
                        }
                        onClick={(e) => handleClick(e.target.textContent)} 
                    >
                        Friends
                    </Button>
                    <Button className={classes.button}
                        style={ historyClicked ?
                            {backgroundColor: '#144475'} :
                            {} 
                        }
                        onClick={(e) => handleClick(e.target.textContent)} 
                    >
                        History
                    </Button>
                    
                </ButtonGroup>
            <div className={classes.bottom}>
                <Paper elevation={3} className={classes.bottomLeft}>
                    { runsClicked ? <ProfileRunsContainer runs={props.runs} loading={props.runsLoading} /> : null}
                </Paper>
                <Paper elevation={3} className={classes.bottomRight}></Paper>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        userLoading: state.user.loading,
        runs: state.runs.userRuns,
        runsLoading: state.runs.loadingUserRuns,
    }
}

export default connect(mapStateToProps, {fetchUser, fetchUserRuns})(ProfileContainer)