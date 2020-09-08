import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import { joinRun } from '../actions/runActions';
import mapboxgl from 'mapbox-gl';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFndWlsYXIzMTgiLCJhIjoiY2tlazNrOTlkMDMwcjJzb3Yyd20zYm9naSJ9.Ik_aGfxRFIrtj1Azc9jGXw';

const useStyles = makeStyles((theme) => ({
    root: {
    maxWidth: 650,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    },
    media: {
        height: 30,
        paddingTop: '56.25%', // 16:9
        // marginLeft: 10,
        // marginRight: 10,
    },
    expand: {
        marginLeft: 'auto',
    },
    avatar: {
        backgroundColor: red[500],
    },
    avatarFriend:{
        backgroundColor: red[500],
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: "12px",
        marginLeft: -5,
        border: "2px white solid"
    },
    avatarNoFriend:{
        backgroundColor: '#bdbdbd',
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: "12px",
        marginLeft: -5,
        border: "2px white solid"
    },
    chat: {
        textAlign: 'left',
    },
    joins:{
        paddingLeft: 5,
    }
}));

function DashboardRun(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const {creator, run} = props

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let mapContainer

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [run.longitude, run.latitude],
            zoom: run.zoom
        })
        new mapboxgl.Marker()
        .setLngLat([run.longitude, run.latitude])
        .addTo(map);
        map.scrollZoom.disable();
        map.addControl(new mapboxgl.NavigationControl());
    }, [])

    

    const joinRun = () => {
        const userRun = {
            user_run: {
                user_id: parseInt(localStorage.currentUser, 10),
                run_id: props.run.id
            }
        }

        props.joinRun(userRun)
    }

    const renderFriends = () => {
        let friends = run.users.filter(user => user.id !== run.user_owner_id)
        if (friends.length === 0){
            return <Avatar aria-label="user" className={classes.avatarNoFriend} >
            ...
        </Avatar>
        }
        else if(friends.length <= 3){
            return friends.map(user => 
                <Avatar key={user.id} aria-label="user" src={user.image ? user.image.url : ""} className={classes.avatarFriend} >
                    {user.first_name[0]}
                </Avatar>
        )}
        else{
            return friends.slice(0, 3).map( user =>  
                <Avatar key={user.id} aria-label="user" src={user.image ? user.image.url : ""} className={classes.avatarFriend} >
                    {user.first_name[0]}
                </Avatar>
            )
        }
        
    }

    const renderFriendsText = () => {
        let friends = run.users.filter(user => user.id !== run.user_owner_id)

        if(friends.find(friend => friend.id === parseInt(localStorage.currentUser, 10))){
            let text = ""
            if (friends.length === 1){
                text = ""
            }
            else if(friends.length === 2){
                text = "and 1 other runner"
            }
            else{
                text = `and ${friends.length - 1} other runners`
            }
            return <Typography className={classes.joins} variant="body2" color="textSecondary" component="p">
                    { `You ${text} have joined this run` }
                </Typography>
        }
        else{
            if (friends.length === 0){
                return <Typography className={classes.joins} variant="body2" color="textSecondary" component="p">
                No one has joined this run. <a onClick={joinRun} style={{cursor: 'pointer', color: "#f44336"}}>Click here</a> to join!
            </Typography>
            }
            else{
                return <Typography className={classes.joins} variant="body2" color="textSecondary" component="p">
                {`${friends.length} ${ friends.length === 1 ? "runner has" : "runners have"} joined this run.`}
            </Typography>
            }
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="creator" className={classes.avatar} src={creator.image ? creator.image.url : ""}>
                        {creator['first_name'][0]}
                    </Avatar>
            }
            action={
                
                    <IconButton aria-label="joinRun" onClick={joinRun}>
                        <Tooltip title="Join" placement="left">
                        <AddCircleOutlineIcon color="primary" />
                        </Tooltip>
                    </IconButton>
            }
            title={run.name}
            subheader={<Moment format='MMMM Do YYYY'>{run.date}</Moment>}
            />
            <div
                className={classes.media}
                ref={el => mapContainer = el}
                title={`${creator['first_name']}'s Run`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`Miles: ${run.distance}`}<br/>
                    Pace: 8'00"<br/>
                    Time: {<Moment format='h:mm a'>{run.date}</Moment>}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{marginLeft: '5px'}}>
                {renderFriends()}
                {renderFriendsText()}
                    
                <IconButton
                    className={classes.expand}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ChatIcon color={'primary'} />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.chat}>
                    <Typography paragraph>Kristin: Yo! I'm down!</Typography>
                    <Typography paragraph>
                        Andy: Okay, let's go!
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}


export default connect(null, { joinRun })(DashboardRun)