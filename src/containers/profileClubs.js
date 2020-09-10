import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import pacers from '../images/pacers.jpeg';
import novemberProject from '../images/novemberProject.jpg';
import frontRunners from '../images/frontRunners.jpg';
import potomacRiver from '../images/potomacRiver.jpg';
import georgetown from '../images/georgetown.jpg';
import moCo from '../images/moCo.jpg';
import dccs from '../images/dcCapitalStriders.jpg';
import districtRunning from '../images/districtRunning.jpg';

const useStyles = makeStyles({
    root: {
        minWidth: 320,
    },
    title: {
        fontSize: '28px',
        lineHeight: '50px',
        //backgroundColor: '#bdbdbd',
        color: 'black',
        textAlign: 'left',
        borderBottom: '1px grey groove'

    },
    pos: {
        marginBottom: 12,
    },
    club: {
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
    clubs:{
        height: 306,
        overflow: "scroll",
        borderBottom: '1px grey groove'
    },
    clubText:{
        // fontSize: 18,
        paddingLeft: 8,
        marginBottom: 0,
    },
    searchIcon:{
        position: 'absolute',
        top: '375px',
        right: '20px',
    },
    content: {
        width: '90%',
        margin: 'auto',
        marginTop: 35,
    }
});

const ProfileClubs = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={0}>
        <CardContent className={classes.content}>
            <Typography variant="h4" component="h2" className={classes.title} gutterBottom>
                Clubs
            </Typography>
            <div className={classes.clubs}>
            { localStorage.currentUser === "78" ?
                <div>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={pacers} ></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Pacers
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={novemberProject}></Avatar>
                <Typography component="p" className={classes.clubText}  gutterBottom>
                    November Project
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={frontRunners} ></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    DC Front Runners
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={potomacRiver}>J</Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Potomac River Running Co.
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={georgetown}></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Georgetown Running Club
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={moCo}></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    Montgomery County Road Runners
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={dccs}></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    DC Capital Striders
                </Typography>
            </Paper>
            <Paper className={classes.club} elevation={0} >
                <Avatar className={classes.avatar} src={districtRunning}></Avatar>
                <Typography component="p" className={classes.clubText} gutterBottom>
                    District Running Collective
                </Typography>
            </Paper>
            </div> :
            null }
            </div>
        </CardContent>
        </Card>
    );
}

export default ProfileClubs