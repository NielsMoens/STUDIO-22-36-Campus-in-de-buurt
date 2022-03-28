import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchCampusses } from '../../../../core/modules/map/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import { useCallback, useEffect, useState } from 'react';
import CampusDetailOverview from './CampusDetailOverview';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import GeocoderControl from '../../../Design/MapControls';

import Pin from './pin';
import CreateOrEditMarker from './Form/CreateOrEditMarker';
import AddButton from '../../../Design/AddButton';
import EditButton from '../../../Design/EditButton';
import useFetchNoAuth from '../../../../core/hooks/useFetchNoAuth';
import Pin2 from './pin2';

const CampusOverview = () => {
    const [campus, setCampus] = useState();
    const [relatedMarkers, setRelatedMarkers] = useState();
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
        isLoading,
        refresh,
    } = useFetchNoAuth(apiCall);

    useEffect(() => {
        if(campus){
            fetch(`${process.env.REACT_APP_BASE_API}/markers/${campus.id}/relatedMarkers`, {
                'Content-type': 'application/json'
            })
            .then(res => res.json())
            .then(data => setRelatedMarkers(data));
        }
    }, [campus]);

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
                            <>
                                <div id="map" className={(toggleInfo ? 'hide ' : 'show ') + (admin ? '' : 'fullscreen')}>
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
                                        {relatedMarkers &&(
                                            relatedMarkers.map((marker, index) => (
                                                <Marker
                                                    key={`marker-${index}`}
                                                    campusId={marker.organisation.id}
                                                    longitude={marker.organisation.longitude}
                                                    latitude={marker.organisation.latitude}
                                                    anchor="bottom"
                                                >
                                                    <Pin2/>
                                                </Marker>
                                            ))
                                        )}
                                        
                                        {
                                            popupInfo && (
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
                                            )
                                        }
                                        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position={"top-left"}/>
                                    </Map> 
                                </div>

                                {
                                    campus && (
                                        <>
                                            <div className={'toggler ' + (toggleInfo ? 'hide ' : 'show ') + (admin ? '' : 'fullscreen')} onClick={() => handleToggle()}>
                                                <span>&gt;</span>
                                            </div>
                                            <section className={'infoSidebar ' + (toggleInfo ? 'hide ' : 'show ') + (admin ? '' : 'fullscreen')}>
                                                <div className='infoHeader'>
                                                    <h3>{campus.name}</h3>
                                                    <p>Icon: Address comes here</p> 
                                                    <button onClick={() => handleToggle()}>Toggle</button>
                                                </div>

                                                {
                                                    admin && <EditButton editor={() => setActiveMarker(campus)}/>      
                                                }

                                                <article>
                                                    <h4>Samenwerkingen</h4> 
                                                    <div className='scrollList'>
                                                        <CampusDetailOverview campusId={campus.id} isAdmin={admin}/>
                                                    </div>
                                                </article>
                                            </section>
                                        </>
                                    )
                                }

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
