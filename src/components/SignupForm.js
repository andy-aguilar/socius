import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {loginUser} from '../actions/loginActions';
import {connect} from 'react-redux';

const baseURL = 'http://localhost:3000/'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '40ch',
        height: 'cover',
        },
    },
    textField: {
        backgroundColor: "white",
        color: 'white',
        width: '40ch',
    },
    login: {
        width: "100%",
        backgroundColor: 'black',
        color: 'white',
        padding: '18.5px',
        marginTop: 0,
    },
    button: {
        marginTop: '2em',
        backgroundColor: "#f44336",
        color: "white",
    },
    namesContainer: {
        display: 'flex',
        flexFlow: 'row',
        marginLeft: '10px',
        marginRight: '10px',
    },
    names: {
        margin: 5,
        backgroundColor: "white",
        color: 'white',
    }

}));

const SignupForm = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        let userObj = {
            user: {email_address: email,
            password,
            first_name: firstName,
            last_name: lastName,
            }
        }
        let userConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        }
        fetch( `${baseURL}users`, userConfig )
        .then(resp => resp.json())
        .then(data => {
            if (data.message){
                console.error('Error:', data.message)
            }
            else {
                props.loginUser(data.user)
                localStorage.token = data.jwt
                localStorage.currentUser = data.user
                props.handleLogin()
            }
        })
        setEmail("")
        setPassword("")
    }

    return(
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
            <h1 className={classes.login}> Join Socius Today!</h1>
                <div className={classes.namesContainer}>
                    <TextField 
                        id="filled-search"
                        label="First Name"
                        type="search"
                        variant="filled"
                        className={classes.names}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField 
                        id="filled-search"
                        label="Last Name"
                        type="search"
                        variant="filled"
                        className={classes.names}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <TextField 
                    id="filled-search"
                    label="Email Address"
                    type="search"
                    variant="filled"
                    className={classes.textField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    className={classes.textField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                /><br/>
                <Button type="submit" size="large" variant="contained" className={classes.button}>
                    Signup
                </Button>
            </div>
        </form>
    )
}

export default connect(null, { loginUser })(SignupForm)