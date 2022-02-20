import LogoutButton from '../../Auth/LogoutButton';

const Header = () => {

    return (
        
        <header>
            <ul className="headerNav">
                <li>
                    <a className='logo' href="/">Logo placeholder</a>
                </li>
                <li className="nav-item text-nowrap">
                    <LogoutButton/>
                </li>
            </ul>
        </header>
    );

};

export default Header;
