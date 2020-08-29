import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import runners from '../images/runners.jpg'
import LoginContainer from './LoginContainer'
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
        maxWidth: '100%',
    }
}));


export default function HomeContainer(params) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
                <Container className= {classes.homeContainer}>
                <LoginContainer />
                
            </Container>
        </React.Fragment>
    );
}