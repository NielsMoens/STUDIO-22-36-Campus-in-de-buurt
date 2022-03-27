import { Route, Switch, Redirect } from 'react-router-dom';
import Map from './Map/Map';
import { Routes } from '../../core/routing';
import Users from './Users/Users';
import Organisations from './Organisations/Organisations';

const MainRouting = () => {   
    
    return (
        <Switch>
            <Route path={Routes.Map}>
                <Map />
            </Route>
            <Route path={Routes.Users}>
                <Users/>
            </Route>
            <Route path={Routes.Organisations}>
                <Organisations/>
            </Route>
            <Redirect to={Routes.Map} />
        </Switch>
    );
};

export default MainRouting;
