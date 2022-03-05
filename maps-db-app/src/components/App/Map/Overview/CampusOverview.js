import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchCampusById } from '../../../../core/modules/map/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import { useCallback, useState, useMemo } from 'react';
import AddIcon from '../../../Design/AddIcon';
import CampusDetailOverview from './CampusDetailOverview';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import GeocoderControl from '../../../Design/MapControls';




import CAMPUS from './locations.json';
import Pin from './pin';




const CampusOverview = () => {
    // voor nu gewoon een gehardcode campus id, flexible maken met niels zn map example
    const [campusId, setCampusId] = useState("621a556ab03cd81e39c9cb8e");   
    const [info, setInfo] = useState();
    const [toggleInfo, setToggleInfo] = useState(false);

    const apiCall = useCallback(() => {
        return fetchCampusById(campusId);
    }, [campusId])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    const handleToggle = () => {
        setToggleInfo(!toggleInfo);
    }

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
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

            {
                isLoading && <Spinner />
            }

            {
                data && (
                    <>

                        {
                            info && <Alert color="info">{info}</Alert>
                        }

                        {
                            <>

                                {/* Hier komt da mapke */}

                                <div id="map" className={toggleInfo ? 'hide' : 'show'}>
                                    <Map
                                        initialViewState={{
                                            latitude: 51.054340,
                                            longitude: -3.717424,
                                            zoom: 3.5,
                                            bearing: 0,
                                            pitch: 1
                                        }}
                                        mapStyle="mapbox://styles/mapbox/streets-v10"
                                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
                                        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position={"top-left"}/>
                                    </Map> 
                                </div>


                                {/* <div className={'toggler ' + (toggleInfo ? 'hide' : 'show')} onClick={handleToggle}>
                                    <span>&gt;</span>
                                </div>
                                <section className={'infoSidebar ' + (toggleInfo ? 'hide' : 'show')}>
                                    <div className='infoHeader'>
                                        <h3>{data.name}</h3>
                                        <p>Icon: Address comes here</p> 
                                        <button onClick={handleToggle}>Toggle</button>
                                    </div>
                                    <article>
                                        <h4>Samenwerkingen</h4> 
                                        <div className='scrollList'>
                                            <CampusDetailOverview campusId={campusId}/>
                                        </div>
                                    </article>
                                </section> */}
                                {/* adres mogelijks gewoon in api opslaan ipv lat long? */}
                            </>
                        }
                        
                        
                    </>
                )
            }
        </>
    )
};

export default CampusOverview;
