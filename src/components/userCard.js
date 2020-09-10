import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import trackimage from '../images/trackimage.jpg';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import { fetchUser, fetchUserStats } from '../actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { showEditUserModal } from '../actions/modalActions';
import track2 from '../images/track2.jpg'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column'
    },
    avatar: {
        height: 136,
        width: 136,
        border: '2px solid white'

    },
    table: {
        width: 280,
        textAlign: 'center',
    },
    th: {
        width: '50%',
    },
    td: {
    },
    accordionContainer:{
        display: 'flex',
        flexFlow: 'column',
        padding: '0px'
    }
});

const UserCard = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.fetchUser(localStorage.currentUser)
        props.fetchUserStats(localStorage.currentUser)
    }, [])


    const renderAvatar = () => {
        console.log(props.user)
        return props.user.user.image ? 
            <Avatar
                alt={props.user.user.first_name}
                src={props.user.user.image.url}
                className={classes.avatar}>
            </Avatar> :
            <Avatar
            alt={props.user.user.first_name}
            className={classes.avatar}
            >
                Click here to add an image.
            </Avatar>
    }

    return (
        <Card className={classes.root}>
            { props.user.loading ? 
                <CircularProgress /> :
                <div>
                    <CardActionArea
                        onClick={ props.user.user.image ? () => {props.pushProfile(props.user.user.id)} : props.showEditUserModal}
                    >
                        <CardMedia
                        className={classes.media}
                        image={track2}
                        title="track"
                        >
                        {renderAvatar()}
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {`${props.user.user.first_name} ${props.user.user.last_name}`}
                            </Typography>
                            <table className={classes.table}>
                                <tbody>
                                <tr>
                                    <th className={classes.th}>Friends</th>
                                    <th className={classes.th}>Runs</th>
                                </tr>
                                <tr>
                                    <td>{props.friends.length}</td>
                                    <td>{props.stats.all_runs}</td>
                                </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.accordionContainer}>
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Weekly Stats</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: '0' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                            <Typography className={classes.heading}>Upcoming Runs</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </CardActions>
                </div>
            }
        
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        friends: state.friends.friends,
        stats: state.user.userStats,
    }
}

export default connect(mapStateToProps, { fetchUser, showEditUserModal, fetchUserStats })(UserCard)