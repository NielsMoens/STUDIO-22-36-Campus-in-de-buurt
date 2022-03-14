import Button from '../Design/Button';
import { useAuth } from './AuthContainer';
import { Link } from 'react-router-dom';


const LogoutButton = () => {
    const { logout } = useAuth();

    return <Link to="/splash"><Button onClick={logout} color="outline-light">Sign out </Button></Link>
} 

export default LogoutButton;