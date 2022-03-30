// import TimeTracker from '../TimeTracker/TimeTracker';
import EditIcon from '../../../../Design/EditIcon';
import CreateOrEditMarker from '../../Overview/Form/CreateOrEditMarker';
import OrganisationLinkForm from './OrganisationLinkForm';
import useAuthApi from '../../../../../core/hooks/useAuthApi';
import { useCallback, useState } from 'react';
import { createMarkerLink, fetchMarkerLinksById } from '../../../../../core/modules/organisations/api';
import Alert from '../../../../Design/Alert';
import useFetch from '../../../../../core/hooks/useFetch';
import DeleteCooperation from '../Delete/DeleteCooperation';
import DeleteButton from '../../../../Design/DeleteButton';

const OrganisationDetail = ({Organisation}) => {

    const withAuth = useAuthApi();
    const [info, setInfo] = useState();
    const [deleteCooperation, setDeleteCooperation] = useState();

    const handleSubmit = (data) => {
        data = {
            ...data,
            "organisation": Organisation._id
        }
        console.log(data);
        withAuth(createMarkerLink(data))
        .then(setInfo("Cooperation created"))
        .then(() => refresh())
        .catch((err) => {
            setError(err);
        });
    };

    const apiCall = useCallback(() => {
        return fetchMarkerLinksById(Organisation.id);
    }, [])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    const onUpdate = () => {
        setDeleteCooperation(null);
        refresh();
    }

    return (
        <div className="container">
            {
                info && (
                    <>
                        <Alert> {info} </Alert>
                    </>
                )
            }
            
            <ul>
                <li><h2><b>Organisation Name: </b>{Organisation.name}</h2></li>
                <li><b>Type: </b>{Organisation.type}</li>
                <li><b>Published: </b><span className={Organisation.published ? "green" : "red"}>{JSON.stringify(Organisation.published)}</span></li>
                <li><b>Latitude: </b>{Organisation.latitude}</li>
                <li><b>Longitude: </b>{Organisation.longitude}</li>
                <li><b>Contact: </b>{Organisation.contact ? Organisation.contact : "Geen contact gegevens"}</li>
            </ul>
            <br></br>
            Create cooperation link:
            <OrganisationLinkForm onSubmit={handleSubmit}/>
            
            {data && (
                <>
                    {(data.length> 0) ? "OrganisationLinks:" : ""}
                    
                    <ul>
                        {
                            data.map((campus) => (
                                <li key={campus.campusId}>
                                    <DeleteButton deleter={() => setDeleteCooperation(campus._id)}/> {campus.campus.name}
                                </li>
                            ))
                        }
                    </ul>
                </>
            )}

            {
                deleteCooperation && (
                    <DeleteCooperation
                        campus={deleteCooperation}
                        onUpdate={onUpdate}
                        onDismiss={() => setDeleteCooperation(null)}
                        setInfo={setInfo}
                    />
                )
            }
        </div>
    );
};

export default OrganisationDetail;
    