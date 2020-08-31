import React from 'react';
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

export default function DashboardRun(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.run.users[0]['first_name'][0]}
                    </Avatar>
            }
            action={
                <IconButton aria-label="joinRun">
                    <AddCircleOutlineIcon color="primary" />
                </IconButton>
            }
            title={props.run.name}
            subheader="September 14, 2020"
            />
            <CardMedia
                className={classes.media}
                image={mapimage}
                title={`${props.run.users[0]['first_name']}'s Run`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`Miles: ${props.run.distance}`}<br/>
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