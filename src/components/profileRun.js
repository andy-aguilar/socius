import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { joinRun } from '../actions/runActions';
import mapboxgl from 'mapbox-gl';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFndWlsYXIzMTgiLCJhIjoiY2tlazNrOTlkMDMwcjJzb3Yyd20zYm9naSJ9.Ik_aGfxRFIrtj1Azc9jGXw';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
        margin: 10,

    },
    media: {
        //height: 30,
        paddingTop: '56.25%'
    },
    header: {
        fontSize: 10,
    }
}))

function ProfileRun(props) {
    const classes = useStyles();
    let mapContainer

    const {creator, run} = props

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [run.longitude, run.latitude],
            zoom: run.zoom - 3,
            interactive: false,
        })
        new mapboxgl.Marker()
        .setLngLat([run.longitude, run.latitude])
        .addTo(map);
    }, [])

    return (
        <Card className={classes.root}>
            {/* <CardHeader
                className={classes.header}
                title={run.name}
            /> */}
            <Moment format="MM/DD/YY">{run.date}</Moment>
            <div
                className={classes.media}
                ref={el => mapContainer = el}
                title={`${creator['first_name']}'s Run`}
            ></div>
        </Card>
    )

}

export default ProfileRun