import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

const items = [{
    'label': 'Map',
    'route': Routes.Map,
    'icon': null,
}/*, {
    'label': 'Directors',
    'route': Routes.Directors,
    'icon': null,
}, {
    'label': 'Liked movies',
    'route': Routes.LikedMovies,
    'icon': null,
}*/, {
    'label': 'User',
    'route': Routes.UsersEdit,
    'icon': null,
}]

const Sidebar = () => {
    return (
        <nav id="sidenav" className="sidenav">
            <div>
                <ul>
                    {
                        items.map((item) => (
                            <li key={item.route} className="nav-item">
                                <Link className="nav-link" to={item.route}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );

};

export default Sidebar;
