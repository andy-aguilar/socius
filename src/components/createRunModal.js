import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideCreateRunModal} from '../actions/modalActions';



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

    }
}));

function CreateRunModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

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
                <form>
                    
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