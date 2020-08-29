import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        height: 'cover',
        },
    },
    loginContainer: {
        backgroundColor: 'rgba(0,0,0,.80)',
        
        height: '30em',
        position: 'relative',
        width: '25em',
        padding: '0',
        
    },
}));


const LoginContainer = (props) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.loginContainer}>
                { props.login ? <LoginForm handleLogin={props.handleLogin} /> : <SignupForm handleLogin={props.handleLogin}/> }
            </Container>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(LoginContainer)
