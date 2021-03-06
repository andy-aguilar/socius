import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import { searchUsers, clearSearch} from '../actions/searchActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import FriendCard from '../components/friendCard'
import {addFriends, addRequests} from '../actions/friendActions'


const useStyles = makeStyles({
    root: {
        minWidth: 320,
        marginBottom: 20,
    },
    title: {
        fontSize: '28px',
        lineHeight: '50px',
        //backgroundColor: '#bdbdbd',
        color: 'black',
        textAlign: 'left',
        //borderTop: '1px black groove',
        borderBottom: '1px grey groove'
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
        height: 260,
        overflow: "scroll",
        borderBottom: '1px grey groove',
        marginBottom: 20,
    },
    friendText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
    },
    searchIcon:{
        position: 'absolute',
        top: '18px',
        right: '20px',
    },
    searchContainer:{
        backgroundColor: 'white',
        height: 270,
        minWidth: 320,
        position: 'absolute',
        top: 67,
        zIndex: 1,
    },
    textField: {
        backgroundColor: "white",
        marginTop: 0,
        color: 'white',
        width: 310,
        position: 'absolute',
        zIndex: 2,
        left: 0,
    },
    spacer: {
        height: "48px",
    },
    userContainer: {
        height: 222,
        overflow: 'scroll',
    }
});

const FriendsContainer = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const toggleSearchContainer = (event) => {
        setOpen(!open)
    };
    

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }
    
    useEffect(() => {
        if(query){
            props.searchUsers(query);
        }
        else{props.clearSearch()}
    }, [query]);

    useEffect(() => {
        props.addFriends(localStorage.currentUser)
        props.addRequests(localStorage.currentUser)
        
    }, [])

    const renderUsers = () =>{
        return props.users.map(user => <FriendCard key={user.id} user={user} friends={props.friends} addFriends={props.addFriends} pushProfile={props.pushProfile} />)
    }

    const renderFriends = () => {
        return props.friends.map(user => <FriendCard key={user.id} user={user} friends={props.friends} addFriends={props.addFriends} pushProfile={props.pushProfile} />)
    }


    return (
        <Card className={classes.root} elevation={0}>
        <CardContent style={{padding: '0px', paddingRight: '0px', paddingLeft: '0px'}}>
            <Typography variant="h4" component="h2" className={classes.title} gutterBottom>
            Friends
            </Typography>
            <IconButton className={classes.searchIcon} aria-label="joinRun" onClick={toggleSearchContainer}>
                <SearchIcon />
            </IconButton>
            { open ? 
                <Paper elevation={0} className={classes.searchContainer}>
                    <TextField id="standard-search"
                    label="Search Runners"
                    type="search"
                    className={classes.textField}
                    value={query}
                    onChange={(e) => handleSearch(e)}
                    style={{backgroundColor: "#fff"}}
                />
                <div className={classes.spacer}></div>
                <div className={classes.userContainer}>
                    { props.searching ?
                    <CircularProgress /> :
                    renderUsers()
                    }
                </div>
                </Paper> :
                null
            }
            
            <div className={classes.friends} >
                { props.loading ? <CircularProgress /> : renderFriends() }
            </div>
        </CardContent>
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        users: state.search.users,
        searching: state.search.searching,
        friends: state.friends.friends,
        loading: state.friends.loading,
    }
}

export default connect(mapStateToProps, { searchUsers, clearSearch, addFriends, addRequests })(FriendsContainer)