import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideFilter} from '../actions/modalActions';
//import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { fetchFilteredRuns } from '../actions/runActions'





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
    height: 500,
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
        marginBottom: 0,
    },
    form:{
        margin: theme.spacing(1),
        width: '25ch',
        height: 'cover',
    },
    textField: {
        backgroundColor: "white",
        color: 'white',
        width: 165,
        margin: 10,
        marginLeft: 8,
        marginRight: 8,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
    },
    button: {
        marginTop: 12,
        backgroundColor: "#f44336",
        color: "white",
    },
    x: {
        position: 'absolute',
        top: '8px',
        right: '8px',
    },
    dates: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    times: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slider: {
        width: 250
    },
    headers: {
        paddingTop: 15,
    },
    dash: {
        paddingTop: 25,
    }
}));

function FilterModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [minDate, setMinDate] = React.useState('2020-09-10');
    const [maxDate, setMaxDate] = useState('2020-10-10')
    const [minTime, setMinTime] = React.useState('00:00:00');
    const [maxTime, setMaxTime] = useState('23:59:00')
    const [range, setRange] = useState([0, 26])
    

    // const setDefaultState = () => {
    //     setMinDate('2020-01-01T00:00:00')
    //     setMaxDate('2025-12-31T00:00:00')
    //     setMinTime('00:00:00')
    //     setMaxTime('23:59:00')
    //     setRange([0, 26])
    // }

    const handleClose = () => {
        props.hideFilter()
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        let filter = {
            filter:{
                "min_date": minDate,
                "max_date": maxDate,
                "min_time": minTime,
                "max_time": maxTime,
                "min_distance": range[0],
                "max_distance": range[1]
            }
        }

        props.fetchFilteredRuns(localStorage.currentUser, filter)
        props.hideFilter()
    }

    const handleChange = (event, newValue) => {
        setRange(newValue);
    };





    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="filter-modal"
            aria-describedby="filters-runs-on-dashboard"
        >
            <div style={modalStyle} className={classes.modalPaper}>
                <h1 id="simple-modal-title" className={classes.heading}>Filter Runs</h1>
                <CloseIcon style={{cursor: 'pointer'}} className={classes.x} onClick={handleClose}/>
                <form onSubmit={(e) => handleSubmit(e)} noValidate>
                    <Typography variant="h6" className={classes.headers}>Date</Typography>
                    <div className={classes.dates}>
                    <TextField
                        id="minDate"
                        label=" "
                        type="date"
                        value={minDate}
                        className={classes.textField}
                        onChange={(e) => setMinDate(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <span className={classes.dash}>-</span>
                    <TextField
                        id="maxDate"
                        label=" "
                        type="date"
                        value={maxDate}
                        className={classes.textField}
                        onChange={(e) => setMaxDate(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                    <Typography variant="h6" className={classes.headers}>Time of Day</Typography>
                    <div className={classes.times}>
                    <TextField
                        id="minTime"
                        label=" "
                        type="time"
                        value={minTime}
                        className={classes.textField}
                        onChange={(e) => setMinTime(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <span className={classes.dash}>-</span>
                    <TextField
                        id="maxTime"
                        label=" "
                        type="time"
                        value={maxTime}
                        className={classes.textField}
                        onChange={(e) => setMaxTime(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    </div>
                    <Typography variant="h6" className={classes.headers}>Miles</Typography>
                    <Slider
                        className={classes.slider}
                        value={range}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        max={26}
                        //getAriaValueText={valuetext}
                    />
                    <br></br>
                    
                    <Button type="submit" size="large" variant="contained" className={classes.button}>
                        Filter
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

const mapStateToProps = state => {
    return{
        open: state.modals.filter,
    }
}

export default connect(mapStateToProps, { hideFilter, fetchFilteredRuns })(FilterModal)