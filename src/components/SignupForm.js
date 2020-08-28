import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        height: 'cover',
        },
    },
    textField: {
        backgroundColor: "white",
        color: 'white',
    },
    login: {
        width: "100%",
        backgroundColor: 'black',
        color: 'white',
        padding: '18.5px',
        marginTop: 0,
    },
    button: {
        marginTop: '4em',
    }

}));

const SignupForm = (params) => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        let userObj = {
            email,
            password
        }
        setEmail("")
        setPassword("")
        console.log(userObj)
    }

    return(
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
            <h1 className={classes.login}> Join Socius Today!</h1>
                <TextField 
                    id="filled-search"
                    label="Your Email"
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
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.button}>
                    Signup
                </Button>
            </div>
        </form>
    )
}

export default SignupForm