import './App.css';
import Map from 'react-map-gl';
import * as React from 'react';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmllbHNtb2VucyIsImEiOiJja3pidnlxYnUwMG83MnVwNnB2cGd6MDJ3In0.H6aVXU_6HWClwHkXeHVd3A'; // Set your mapbox token here

function App() {
    return (
        <Map
        initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
        }}
        style={{width: window.innerWidth, height: window.innerHeight}}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        />
    );
}

export default App;
