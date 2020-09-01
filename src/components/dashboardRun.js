import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import mapimage from '../images/mapimage.jpeg'
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import { joinRun } from '../actions/runActions';
import mapboxgl from 'mapbox-gl';

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
    },
    chat: {
        textAlign: 'left',
    }
}));

function DashboardRun(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [longitude, setLongitude] = useState(5);
    const [latitude, setLatitude] = useState(34);
    const [zoom, setZoom] = useState(2);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: zoom
        })
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

    const {creator, run} = props

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {creator['first_name'][0]}
                    </Avatar>
            }
            action={
                <IconButton aria-label="joinRun" onClick={joinRun}>
                    <AddCircleOutlineIcon color="primary" />
                </IconButton>
            }
            title={run.name}
            subheader="September 14, 2020"
            />
            <CardMedia
                className={classes.media}
                image={mapimage}
                title={`${creator['first_name']}'s Run`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`Miles: ${run.distance}`}<br/>
                    Pace: 8'00"<br/>
                    Time: 6:00 a.m.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                    <Avatar aria-label="recipe" className={classes.avatarFriend}>
                        K
                    </Avatar>
                <Typography variant="body2" color="textSecondary" component="p">
                    { "Kristin is joining this run" }
                </Typography>
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