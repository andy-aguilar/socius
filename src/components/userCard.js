import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import trackimage from '../images/trackimage.jpg';
import andy from '../images/andy.jpeg';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import { fetchUser } from '../actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    }, [])

    return (
        <Card className={classes.root}>
            { props.user.loading ? 
                <CircularProgress /> :
                <div>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={trackimage}
                        title="track"
                        >
                        <Avatar alt="Remy Sharp" src={andy} className={classes.avatar}></Avatar>
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
                                    <td>0</td>
                                    <td>0</td>
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
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUser })(UserCard)