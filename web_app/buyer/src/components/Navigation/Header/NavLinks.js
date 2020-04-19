import React, { useState, useContext, useEffect } from './node_modules/react';

import { NavLink } from './node_modules/react-router-dom';
import { NavDropdown } from './node_modules/react-bootstrap';
import LoginModal from './LoginModal';
import { AuthContext } from '../../Context/Auth/auth-context';

import './NavLinks.css';

const NavLinks = () => {
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (auth.isLoggedIn) {
            setShow(false);
        }
    }, [auth.isLoggedIn]);

    return (
        <React.Fragment>
            <LoginModal show={show} close={handleClose} />
            <NavLink className="nav-route" to="/" exact>Home</NavLink>
            <NavLink className="nav-route" to="/shop" exact>Shop</NavLink>
            {auth.isLoggedIn && (
                <NavLink className="nav-route" to="/bundles" exact>Bundles</NavLink>
            )}
            <NavLink className="nav-route" to="/about" exact>About</NavLink>
            {auth.isLoggedIn && (
                <div className="dropdown-nav-button">
                    <NavDropdown id="dropdown-basic-button" title="Account">
                        <NavLink className="dropdown-item" to="/profile" exact>Profile</NavLink>
                        <NavLink className="dropdown-item" to="/orders" exact>Orders</NavLink>
                        <NavLink className="dropdown-item" to="/favorites" exact>Favorites</NavLink>
                        <NavLink className="dropdown-item" to="/about" exact>About</NavLink>
                        <NavDropdown.Divider />
                        <NavLink className="dropdown-item" to="/logout" exact>Logout</NavLink>
                    </NavDropdown>
                </div>
            )}
            {!auth.isLoggedIn && (
                <button className="login-btn" onClick={handleShow}>Login</button>
            )}
            {auth.isLoggedIn && (
                <button className="login-btn" onClick={auth.logout}>Logout</button>
            )}
        </React.Fragment>
    );
};

export default NavLinks;
