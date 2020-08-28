import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import runners from '../images/runners.jpg'
import LoginContainer from './LoginContainer'
import LoginForm from '../components/LoginForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        height: 'cover',
        },
    },
    homeContainer: {
        backgroundImage: `url(${runners})`,
        backgroundSize: "cover",
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    }
}));


export default function HomeContainer(params) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
                <Container maxWidth="100%" className= {classes.homeContainer}>
                <LoginContainer />
                
            </Container>
        </React.Fragment>
    );
}