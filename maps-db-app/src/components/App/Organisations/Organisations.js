import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import OrganisationsOverview from './Overview/OrganisationsOverview';
import AdminRoute from '../../Shared/Route/AdminRoute';
import OrganisationsDetailContainer from './Detail/OrganisationsDetailContainer';

const Organisations = () => {
    return (
        <Switch>
            <AdminRoute path={Routes.OrganisationsDetail}>
                <OrganisationsDetailContainer/>
            </AdminRoute>
            <AdminRoute path={Routes.Organisations}>
                <OrganisationsOverview />
            </AdminRoute>
            <Redirect to={Routes.Organisations} />
        </Switch>
    );
};

export default Organisations;
