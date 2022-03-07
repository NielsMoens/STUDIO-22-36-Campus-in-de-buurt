import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import CampusOverview from './Overview/CampusOverview';

const Map = () => {
    return (
        <Switch>
            <Route path={Routes.Map}>
                <CampusOverview />
            </Route>
            <Redirect to={Routes.Map} />
        </Switch>
    );
};

export default Map;
