import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideEditUserModal} from '../actions/modalActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {updateUser} from '../actions/userActions';
import CloseIcon from '@material-ui/icons/Close';




function getModalStyle() {

    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    modalPaper: {
    position: 'absolute',
    width: '25em',
    height: 400,
    backgroundColor: 'rgba(0,0,0,.80)',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    outline: 'none',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center'
    },
    heading: {
        backgroundColor: 'black',
        color: 'white',
        paddingBlockStart: '.67em',
        paddingBlockEnd: '.67em',
        marginBlockStart: 0,
    },
    form:{
        margin: theme.spacing(1),
        width: '25ch',
        height: 'cover',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        backgroundColor: "white",
        color: 'white',
        width: 350,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#f44336",
        color: "white",
    },
    x: {
        position: 'absolute',
        top: '8px',
        right: '8px',
    },
    namesContainer: {
        display: 'flex',
        flexFlow: 'row',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: 5,
    },
    names: {
        margin: 5,
        backgroundColor: "white",
        color: 'white',
    }
}));

function EditUserModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    



    const handleClose = () => {
        props.hideEditUserModal()
        setFirstName("")
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const user={
            user: {
                first_name: firstName,
                last_name: lastName,
                email_address: email,
            },

        }
        props.updateUser(user, localStorage.currentUser)
        e.target.reset()
        props.hideEditUserModal()
    }

    useEffect(() => {
        setFirstName(props.user.first_name)
        setLastName(props.user.last_name)
        setEmail(props.user.email_address)
    }, [props])



    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.modalPaper}>
                <h1 id="simple-modal-title" className={classes.heading}>Edit Profile</h1>
                <CloseIcon style={{cursor: 'pointer'}} className={classes.x} onClick={handleClose}/>
                <form noValidate>
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
                    <br/>
                    <Button type="submit" size="large" variant="contained" className={classes.button}>
                        Update Profile
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

const mapStateToProps = state => {
    return{
        open: state.modals.editUser,
        user: state.user.user
    }
}

export default connect(mapStateToProps, { hideEditUserModal })(EditUserModal)