import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchCampusses } from '../../../../core/modules/map/api';
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

import Pin from './pin';
import { isAdmin } from '../../../../core/modules/auth/utils';
import Modal from '../../../Shared/Modal';
import AddButton from '../../../Design/AddButton';
import CreateOrEditMarker from './Form/CreateOrEditMarker';

const CampusOverview = () => {
    // voor nu gewoon een gehardcode campus id, flexible maken met niels zn map example
    const [campus, setCampus] = useState();   
    const [info, setInfo] = useState();
    const [toggleInfo, setToggleInfo] = useState(false);
    const [popupInfo, setPopupInfo] = useState(null);
    
    const [activeMarker, setActiveMarker] = useState();
    const [deleteMarker, setDeleteMarker] = useState();


    const apiCall = useCallback(() => {
        return fetchCampusses();
    }, [])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    const handleToggle = (campusId=null) => {
        if(campusId) {
            setToggleInfo(false);
            return;
        }
        setToggleInfo(!toggleInfo);
    }

    const admin = useAdmin();

    const handleCreate = () => {
        setActiveMarker({});
    }

    const onUpdate = () => {
        setActiveMarker(null);
        setDeleteMarker(null);
        refresh();
    }

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
                                <div id="map" className={toggleInfo ? 'hide' : 'show'}>
                                    <Map
                                        initialViewState={{
                                            latitude: 51.04097,
                                            longitude: 3.728,
                                            zoom: 11.5,
                                            bearing: 0,
                                            pitch: 1
                                        }}
                                        mapStyle="mapbox://styles/mapbox/streets-v10"
                                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                    >
                                        <GeolocateControl position="top-left" />
                                        <NavigationControl position="top-left" />
                                        <ScaleControl />
                                        {data.map((campus, index) => (
                                            <Marker
                                                key={`marker-${index}`}
                                                campusId={campus.id}
                                                longitude={campus.longitude}
                                                latitude={campus.latitude}
                                                anchor="bottom"
                                            >
                                                <Pin onClick={() => {
                                                    setPopupInfo(campus)
                                                    setCampus(campus)
                                                    handleToggle(campus.id)
                                                }} />
                                            </Marker>
                                            ))
                                        }
                                        {popupInfo && (
                                            console.log(popupInfo),
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
                                                <img width="100%" src={popupInfo.imageLink} />
                                            </Popup>
                                        )}
                                        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position={"top-left"}/>
                                    </Map> 
                                </div>

                                {
                                campus && (
                                    <>
                                        <div className={'toggler ' + (toggleInfo ? 'hide' : 'show')} onClick={() => handleToggle()}>
                                            <span>&gt;</span>
                                        </div>
                                        <section className={'infoSidebar ' + (toggleInfo ? 'hide' : 'show')}>
                                            <div className='infoHeader'>
                                                <h3>{campus.name}</h3>
                                                <p>Icon: Address comes here</p> 
                                                <button onClick={() => handleToggle()}>Toggle</button>
                                            </div>
                                            <article>
                                                <h4>Samenwerkingen</h4> 
                                                <div className='scrollList'>
                                                    <CampusDetailOverview campusId={campus.id}/>
                                                </div>
                                            </article>
                                        </section>
                                    </>
                                )}
                                {/* adres mogelijks gewoon in api opslaan ipv lat long? */}
                            </>
                        }

                        {
                            admin && (
                                <>
                                    <AddButton adder={() => handleCreate()}/>

                                    {
                                        activeMarker && (
                                            <CreateOrEditMarker
                                                marker={activeMarker}
                                                onUpdate={onUpdate}
                                                onDismiss={() => setActiveMarker(null)}
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                        
                    </>
                )
            }
        </>
    )
};

export default CampusOverview;
