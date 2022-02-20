import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import MoviesOverview from './Overview/MoviesOverview';
import MapDetailContainer from './Detail/MapDetailContainer';

const Map = () => {
    return (
        <Switch>
            <Route path={Routes.MapDetail}>
                <MapDetailContainer />
            </Route>
            <Route path={Routes.Map}>
                <MoviesOverview />
            </Route>
            <Redirect to={Routes.Map} />
        </Switch>
    );
};

export default Map;
