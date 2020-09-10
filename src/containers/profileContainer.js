import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/userActions';
import {fetchUserRuns, fetchUserHistory} from '../actions/runActions'
import trackimage from '../images/trackimage.jpg';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import ProfileRunsContainer from './profileRunsContainer'
import Calendar from './calendarContainer';
import {fetchUserStats} from '../actions/userActions';
import { TextareaAutosize } from '@material-ui/core';
import ProfileClubs from './profileClubs';

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
        width: '59%',
        paddingTop: 10,
        marginRight: 10,
    },
    bottomRight:{
        height: '100%',
        width: '39%',
        //marginRight: 10,
    },
    heading: {
        marginTop: 0,
        marginLeft: 100,
        marginRight: 100,
        borderBottom: "1px grey solid",
        paddingBottom: 10,
    },
    table: {
        margin: 'auto',
        width: 320,
        textAlign: 'left',
    },
    th:{
        paddingLeft: 10,
        borderBottom: "1px grey groove",
    },
    grey: {
        paddingLeft: 10,
        backgroundColor: '#eeeeee'
    },
    white: {
        paddingLeft: 10,
    },

}));

const ProfileContainer = (props) => {
    const classes = useStyles();
    const [runsClicked, setRunsClicked] = useState(true)
    const [friendsClicked, setFriendsClicked] = useState(false)
    const [calendarClicked, setCalendarClicked] = useState(false)
    const [historyClicked, setHistoryClicked] = useState(false)
    const [style, setStyle] = useState({})

    useEffect(() => {
        props.fetchUser(props.match.params.id)
        props.fetchUserRuns(props.match.params.id)
        props.fetchUserHistory(props.match.params.id)
        props.fetchUserStats(props.match.params.id)
    }, [])

    const handleScroll = (e) => {
        if(e.target.documentElement){
            if(e.target.documentElement.scrollTop >= 344){
                    setStyle({
                        position: "fixed",
                        right: "100px",
                        top: "70px",
                        width:"34.5%",
                    })
            }
            else{
                setStyle({})
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
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

    const renderPage = () => {
        if(runsClicked){
            return <ProfileRunsContainer runs={props.runs} loading={props.runsLoading} />
        }
        else if (historyClicked){
            return <ProfileRunsContainer runs={props.userHistory} loading={props.historyLoading} />
        }
        else if (calendarClicked){
            return <Calendar />
        }
        else{
            return <p>Sorry, you haven't built that yet</p>
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
    <h1 id="simple-modal-title" className={classes.heading}>{props.user.user.first_name + " " + props.user.user.last_name}</h1>
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
                    {renderPage()}
                </Paper>
                <Paper elevation={3} className={classes.bottomRight} style={style}>
                    <h1>Runner Stats</h1>
                    <table className={classes.table}>
                        <tbody>
                                <tr>
                                    <th className={classes.th}>Category</th>
                                    <th className={classes.th}>Total</th>
                                </tr>
                                <tr>
                                    <td className={classes.grey}>Total Runs</td>
                                    <td className={classes.grey}>{props.stats.all_runs}</td>
                                </tr>
                                <tr>
                                    <td className={classes.white}>Total Future Runs</td>
                                    <td className={classes.white}>{props.stats.future_runs}</td>
                                </tr>
                                <tr>
                                    <td className={classes.grey} >Created Future Runs</td>
                                    <td className={classes.grey}>{props.stats.future_planned_runs}</td>
                                </tr>
                                <tr>
                                    <td className={classes.white}>Joined Future Runs</td>
                                    <td className={classes.white}>{props.stats.future_joined_runs}</td>
                                </tr>
                                <tr>
                                    <td className={classes.grey}>Total Created Runs</td>
                                    <td className={classes.grey}>{props.stats.created_runs}</td>
                                </tr>
                                <tr>
                                    <td className={classes.white}>Runs Completed</td>
                                    <td className={classes.white}>{props.stats.past_runs}</td>
                                </tr>

                                <tr>
                                    <td className={classes.grey}>Friends</td>
                                    <td className={classes.grey}>{props.stats.friends}</td>
                                </tr>

                        </tbody>

                    </table>

                    <ProfileClubs /> 
                </Paper>
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
        userHistory: state.runs.userHistory,
        historyLoading: state.runs.updatingHistory,
        stats: state.user.userStats
    }
}

export default connect(mapStateToProps, {fetchUser, fetchUserRuns, fetchUserHistory, fetchUserStats})(ProfileContainer)