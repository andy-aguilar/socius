import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import runners from '../images/runners.jpg'
import LoginContainer from './LoginContainer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    homeContainer: {
        backgroundImage: `url(${runners})`,
        backgroundSize: "cover",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        maxWidth: '100%',
    },
    spacer:{
        height: '64px',
    }
}));


export default function HomeContainer(props) {

    const handleLogin = () => {
        props.history.push("/dashboard")
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            
            <CssBaseline/>
            <div style={{height: '64px'}}></div>
                <Container className= {classes.homeContainer}>
                <LoginContainer handleLogin={handleLogin}/>
                
            </Container>
        </React.Fragment>
    );
}