import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {searchUsers} from '../actions/searchActions'


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
        backgroundColor: 'rgba(0,0,0,.87)',
        minHeight: 274,
        minWidth: 320,
        position: 'absolute',
        top: 65,
        zIndex: 1,
    },
    textField: {
        backgroundColor: "#828282",
        marginTop: 5,
        color: 'white',
        width: 310,
    },
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
    }, [query]);
    

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
                <Paper className={classes.searchContainer}>
                    <TextField id="filled-search"
                    label="Search Runners"
                    type="search"
                    variant="filled"
                    className={classes.textField}
                    value={query}
                    onChange={(e) => handleSearch(e)}
                />
                </Paper> :
                null
            }
            
            
            <div className={classes.friends} >
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
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        users: state.search.users,
        searching: state.search.searching
    }
}

export default connect(mapStateToProps, { searchUsers })(FriendsContainer)