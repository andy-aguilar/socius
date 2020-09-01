import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideCreateRunModal} from '../actions/modalActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createRun} from '../actions/runActions';
import CloseIcon from '@material-ui/icons/Close';




function getModalStyle() {

    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
    position: 'absolute',
    width: 400,
    height: 450,
    backgroundColor: 'rgba(0,0,0,.80)',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    outline: 'none',
    color: 'white',
    textAlign: 'center',
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
        width: 250,
        marginBottom: 10,
    },
    timeField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    button: {
        marginTop: 45,
        backgroundColor: "#f44336",
        color: "white",
    },
    x: {
        position: 'absolute',
        top: '8px',
        right: '8px',
    }
}));

function CreateRunModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState("")
    const [time, setTime] = useState("2020-08-22T06:00")
    const [distance, setDistance] = useState(0)


    const handleClose = () => {
        props.hideCreateRunModal()
        setName("")
        setTime("2020-08-22T06:00")
        setDistance(0)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const run={
            run: {name,
            date: time,
            distance, 
            user_id: parseInt(localStorage.currentUser, 10)}
        }
        props.createRun(run)
        e.target.reset()
        props.hideCreateRunModal()
    }

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h1 id="simple-modal-title" className={classes.heading}>Create Run</h1>
                <CloseIcon className={classes.x} onClick={props.hideCreateRunModal}/>
                <form onSubmit={(e) => handleSubmit(e)} noValidate>
                    <TextField id="filled-search"
                        label="Run Name"
                        type="search"
                        variant="filled"
                        className={classes.textField}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="datetime-local"
                        label="Date/Time"
                        type="datetime-local"
                        variant='filled'
                        value={time}
                        
                        className={classes.timeField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <TextField
                        id="filled-number"
                        label="Miles"
                        type="number"
                        className={classes.textField}
                        inputProps={{ min: 0, max: 1000}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        value= {distance}
                        onChange={(e) => { setDistance(parseInt(e.target.value, 10))}}
                    /><br/>
                    <Button type="submit" size="large" variant="contained" className={classes.button}>
                    Create Run
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

const mapStateToProps = state => {
    return{
        open: state.modals.createRun
    }
}

export default connect(mapStateToProps, { hideCreateRunModal, createRun })(CreateRunModal)