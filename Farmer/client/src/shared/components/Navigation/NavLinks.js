import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
import { Button } from 'react-bootstrap';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/products`}>MY PRODUCTS</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/products/new">ADD PRODUCT</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
            )}
            {auth.isLoggedIn && (
            <li>
                <Button variant="outline-success" onClick={auth.logout}>LOGOUT</Button>
            </li>
            )}
        </ul>  
    );
};

export default NavLinks;