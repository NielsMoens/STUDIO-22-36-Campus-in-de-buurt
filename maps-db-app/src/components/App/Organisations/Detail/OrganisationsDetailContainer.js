import { fetchOrganisationById } from '../../../../core/modules/organisations/api';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { useCallback } from 'react';
import { Routes } from '../../../../core/routing';
import EditOrganisation from './Edit/EditOrganisation';
import OrganisationDetail from './Detail/OrganisationDetail';
import AdminRoute from '../../../Shared/Route/AdminRoute';


const OrganisationsDetailContainer = () => {

    const { id } = useParams();
    const apiCall = useCallback(() => {
        return fetchOrganisationById(id);
    }, [id])

    // todo error object

    const {
        data: organisation,
        setData,
        error,
        isLoading
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Switch>
                {/* <AdminRoute path={Routes.OrganisationsEdit}>
                    <EditOrganisation movie={movie} onUpdate={(data) => setData(data)}/>
                </AdminRoute> */}
                <AdminRoute path={Routes.OrganisationsDetail}>
                    <OrganisationDetail Organisation={organisation} />
                </AdminRoute>
                <Redirect to={Routes.Organisations}/>
            </Switch>
        </>
    )
};

export default OrganisationsDetailContainer;