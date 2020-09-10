import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {hideEditRun} from '../actions/modalActions';
import {editRun} from '../actions/runActions'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import mapboxgl from 'mapbox-gl';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    progress:{
        position: 'absolute',
        top: 325,
        right: '48%',
    }
}));

function EditRunModal(props) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState("")
    const [time, setTime] = useState("2020-09-10T06:00")
    const [distance, setDistance] = useState(0)
    const [longitude, setLongitude] = useState(-77.03680636144968);
    const [latitude, setLatitude] = useState(38.89618501163949);
    const [zoom, setZoom] = useState(12.02);
    const [editing, setEditing] = useState(true)

    let mapContainer

    const handleClose = () => {
        props.hideEditRun()
        setName("")
        setTime("2020-08-22T06:00")
        setDistance(0)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let run={
            run: {
                name,
                date: time,
                distance, 
                latitude,
                longitude,
                zoom,
            },

        }
        let config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(run)
        }
        fetch(`http://localhost:3000/runs/${props.run}`, config).then(resp => {
            return resp.json()
        }).then(run => {
            props.editRun(run)
            handleClose()
        })
        
    }

    useEffect(() => {
        if(props.run){
            let config = {
                method: 'GET',
                headers: {
                    "Authorization": `bearer ${localStorage.token}`
                }
            }
            fetch(`http://localhost:3000/runs/${props.run}`, config).then(resp => {
                return resp.json()
            }).then(run => {
                setName(run.name);
                setTime(run.date.split(".")[0]);
                setDistance(run.distance);
                setLongitude(run.longitude);
                setLatitude(run.latitude);
                setZoom(run.zoom);
                setEditing(false)
            })
        }
    }, [props.run])

    useEffect(() => {
        if(props.open && !editing){
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
                    const marker = new mapboxgl.Marker({
                        draggable: true,
                        id: 'test-marker'
                    })
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                    function onDragEnd() {
                        var lngLat = marker.getLngLat();
                        setLatitude(lngLat.lat)
                        setLongitude(lngLat.lng)
                        }
                    marker.on('dragend', onDragEnd);
                    
                
                // map.on('click', (e) => {
                //     const modal = document.getElementsByClassName("makeStyles-modalPaper-9")[0];
                //     const circle = modal.getElementsByClassName('mapboxgl-user-location-accuracy-circle')
                //     const testMarker = modal.getElementsByClassName("mapboxgl-marker")
                //     console.log(circle, testMarker)
                //     if(testMarker.length === 0 || (circle.length !== 0 && testMarker.length === circle.length + 1)){
                //         setLatitude(e.lngLat.lat)
                //         setLongitude(e.lngLat.lng)
                //         let coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;
                //         let popup = new mapboxgl.Popup().setText(coords);
                //         let el = document.createElement('div');
                //         el.id = 'set-marker';
                //         el.className = 'TEST'
                        
                //     }
                
                
                //     // // create DOM element for the marker
                
                //     // // create the marker

                // });
            }, 50)
        }
    }, [props.open, editing])
        


    


    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            
            <div style={modalStyle} className={classes.modalPaper}>
            { editing ? 
                <CircularProgress className={classes.progress}/> : 
                <div>
                <h1 id="simple-modal-title" className={classes.heading}>Edit Run</h1>
                <CloseIcon className={classes.x} style={{cursor: 'pointer'}} onClick={handleClose}/>
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
                    Update Run
                    </Button>
                </form>
                </div>
                }
            </div>
        </Modal>
    );
}

const mapStateToProps = state => {
    return{
        open: state.modals.editRun,
        run: state.runs.editingRun
    }
}

export default connect(mapStateToProps, { hideEditRun, editRun })(EditRunModal)