import { Route, Switch, Redirect } from 'react-router-dom';
import Map from './Map/Map';
import Movies from './Movies/Movies';
import Directors from './Directors/Directors';
import { Routes } from '../../core/routing';
import LikedMoviesOverview from './Liked/Overview/LikedMoviesOverview';
import Users from './Users/Users';

const MainRouting = () => {   
    
    return (
        <Switch>
            {/* <Route path={Routes.Movies}>
                <Movies />
            </Route> */}
            <Route path={Routes.Map}>
                <Map />
            </Route>
            {/* <Route path={Routes.Directors}>
                <Directors />
            </Route>
            <Route path={Routes.LikedMovies}>
                <LikedMoviesOverview/>
            </Route> */}
            <Route path={Routes.Users}>
                <Users/>
            </Route>
            <Redirect to={Routes.Map} />
        </Switch>
    );
};

export default MainRouting;
