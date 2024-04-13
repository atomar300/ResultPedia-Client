import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const Header = () => {
    const dispatch = useDispatch();
    
    const { isAuthenticated } = useSelector((state) => state.user);

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const logMeOut = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
    }

    return (
        <div>
            <div className='navbar'>
                <MenuIcon className='menu-bars' onClick={showSidebar} />

                <Link to="/" className="logo">
                    ResultPedia
                </Link>

                <Link to="/login" className='header-links'>
                    <PersonIcon />
                </Link>

                    {isAuthenticated ? <LogoutIcon className='header-links'  onClick={logMeOut} /> : false}
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li>
                        <CloseIcon onClick={showSidebar} />
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/students">Students</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/results">Results</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;