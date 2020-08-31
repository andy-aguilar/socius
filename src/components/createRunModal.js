import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideCreateRunModal} from '../actions/modalActions';
import TextField from '@material-ui/core/TextField';



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
}));

function CreateRunModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [name, setName] = React.useState("")
    const [time, setTime] = React.useState("2017-05-24T10:30")

    const handleClose = () => {
        props.hideCreateRunModal()
    };

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h1 id="simple-modal-title" className={classes.heading}>Create Run</h1>
                <form noValidate>
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
                    />
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

export default connect(mapStateToProps, { hideCreateRunModal })(CreateRunModal)