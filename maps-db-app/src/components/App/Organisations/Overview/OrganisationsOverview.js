import { Link } from "react-router-dom";
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchOrganisations } from '../../../../core/modules/organisations/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import { useCallback, useEffect, useState } from 'react';

import CreateOrEditMarker from './Form/CreateOrEditMarker';
import AddButton from '../../../Design/AddButton';
import EditButton from '../../../Design/EditButton';
import useFetchNoAuth from '../../../../core/hooks/useFetchNoAuth';
import { route, Routes } from '../../../../core/routing';

const OrganisationsOverview = () => {
    const [campus, setCampus] = useState();
    const [toggleInfo, setToggleInfo] = useState(false);
    
    const [activeMarker, setActiveMarker] = useState();
    const [deleteMarker, setDeleteMarker] = useState();

    const apiCall = useCallback(() => {
        return fetchOrganisations();
    }, [])

    const {
        data,
        error,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    // useEffect(() => {
    //     if(campus){
    //         fetch(`${process.env.REACT_APP_BASE_API}/markers/${campus.id}/relatedMarkers`, {
    //             'Content-type': 'application/json'
    //         })
    //         .then(res => res.json())
    //         .then(data => setRelatedMarkers(data));
    //     }
    // }, [campus]);

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
               <>
                    {
                        data && (
                            <>
                              
                              {
                                data.map((org) => (
                                    <li key={org._id}>
                                        <Link to={route(Routes.OrganisationsDetail, {id: org._id})}>
                                            {org.name}
                                        </Link>
                                        {org.type}
                                    </li>
                                )) 
                              } 
                            </>
                        )
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
            }
            
        </>
    )
};

export default OrganisationsOverview;
