import * as React from 'react';
import {useState, useMemo} from 'react';
import {render} from 'react-dom';
import Map, {
    ControlPosition,
    useControl,
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import ControlPanel from './control-panel';
import Pin from './pin';
import CAMPUS from '../../.data/locations.json';
import GeocoderControl from './geocoder-control';
const TOKEN = 'pk.eyJ1IjoibmllbHNtb2VucyIsImEiOiJja3pidnlxYnUwMG83MnVwNnB2cGd6MDJ3In0.H6aVXU_6HWClwHkXeHVd3A'; // Set your mapbox token here

export default function App() {
    const [popupInfo, setPopupInfo] = useState(null);
    const pins = useMemo(
        () =>
            CAMPUS.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                >
                    <Pin onClick={() => setPopupInfo(city)} />
                </Marker>
            )),
        []
    );

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 51.054340,
                    longitude: -3.717424,
                    zoom: 3.5,
                    bearing: 0,
                    pitch: 1
                }}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxAccessToken={TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.campus}, |{' '}
                            <a
                                target="_new"
                                href={`https://www.arteveldehogeschool.be/bij-ons-studeren/onze-locaties/${popupInfo.campus}`}
                            >
                                Website
                            </a>
                        </div>
                        <img width="100%" src={popupInfo.image} />
                    </Popup>
                )}
                <GeocoderControl mapboxAccessToken={TOKEN} position={"top-left"}/>
            </Map>
            {/* <ControlPanel /> */}
        </>
    );
}

export function renderToDom(container) {
    render(<App />, container);
}
