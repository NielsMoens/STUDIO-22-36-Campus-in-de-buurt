// import TimeTracker from '../TimeTracker/TimeTracker';
import { route, Routes } from '../../../../../core/routing';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import formatMinutesToString from '../../../../../core/modules/movies/utils';
import EditIcon from '../../../../Design/EditIcon';
import CreateOrEditMarker from '../../Overview/Form/CreateOrEditMarker';
import OrganisationLinkForm from './OrganisationLinkForm';
import useAuthApi from '../../../../../core/hooks/useAuthApi';
import { useState } from 'react';
import { createMarkerLink } from '../../../../../core/modules/organisations/api';
import Alert from '../../../../Design/Alert';

const OrganisationDetail = ({Organisation, onUpdate}) => {

    const withAuth = useAuthApi();
    const [info, setInfo] = useState();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        data = {
            ...data,
            "organisation": Organisation._id
        }
        console.log(data);
        withAuth(createMarkerLink(data))
        .then(setInfo("Cooperation created"))
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    };

    return (
        <>
            {
                info && (
                    <>
                        <Alert> {info} </Alert>
                    </>
                )
            }
            <h2>{Organisation.name}</h2>
            <br></br>
            Create cooperation link:
            <OrganisationLinkForm onSubmit={handleSubmit}/>

        </>
    );
};

export default OrganisationDetail;
    