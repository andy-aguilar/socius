import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideCreateRunModal} from '../actions/modalActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createRun} from '../actions/runActions';
import CloseIcon from '@material-ui/icons/Close';
import mapboxgl from 'mapbox-gl';
import Container from '@material-ui/core/Container';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFndWlsYXIzMTgiLCJhIjoiY2tlazNrOTlkMDMwcjJzb3Yyd20zYm9naSJ9.Ik_aGfxRFIrtj1Azc9jGXw';

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
    width: 500,
    height: 700,
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
        marginTop: 20,
        backgroundColor: "#f44336",
        color: "white",
    },
    x: {
        position: 'absolute',
        top: '8px',
        right: '8px',
    },
    mapContainer:{
        position: 'relative',
        width: 480,
        height: 300,
        marginTop: 20,
        marginLeft: 10,
    }
}));

function CreateRunModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState("")
    const [time, setTime] = useState("2020-08-22T06:00")
    const [distance, setDistance] = useState(0)
    const [longitude, setLongitude] = useState(-77.0489);
    const [latitude, setLatitude] = useState(38.8892);
    const [zoom, setZoom] = useState(14.65);

    let mapContainer

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

    useEffect(() => {
        if(props.open){
            setTimeout(()=> {
                const map = new mapboxgl.Map({
                    container: mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [longitude, latitude],
                    zoom: zoom
                })
                map.on('move', () => {
                    setZoom(map.getZoom().toFixed(2))
                    });
                map.addControl(
                    new mapboxgl.GeolocateControl({
                    positionOptions: {
                    enableHighAccuracy: true
                    },
                    trackUserLocation: true
                    })
                    );
                
                map.on('click', (e) => {
                    console.log(e.lngLat)
                    const modal = document.getElementsByClassName("makeStyles-modalPaper-1")[0];
                    const testMarker = modal.getElementsByClassName("mapboxgl-marker")
                    if(testMarker.length === 0){
                        let coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
                        let popup = new mapboxgl.Popup().setText(coords);
                        let el = document.createElement('div');
                        el.id = 'set-marker';
                        el.className = 'TEST'
                        const marker = new mapboxgl.Marker({
                            draggable: true,
                            id: 'test-marker'
                        })
                            .setLngLat(e.lngLat)
                            .setPopup(popup)
                            .addTo(map);
                        function onDragEnd() {
                            var lngLat = marker.getLngLat();
                            console.log(lngLat)
                            setLatitude(lngLat.lat)
                            setLongitude(lngLat.lng)
                            }
                        marker.on('dragend', onDragEnd);
                    }
                
                
                    // // create DOM element for the marker
                
                    // // create the marker

                });
            }, 500)
        }
    }, [props.open])
        


    


    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.modalPaper}>
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
                    <div 
                        className={classes.mapContainer}
                        ref={el => mapContainer = el}
                    ></div>
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