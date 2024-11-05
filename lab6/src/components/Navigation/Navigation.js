import React from "react";
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import {LinkingWrapper} from './Navigation.styled';

const Navigation = () => (
    <Router>
        <LinkingWrapper>
            <div className="nav">
                <div className="nav-element">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "selected" : "")}>Home</NavLink>
                </div>
                <div className="nav-element">
                    <NavLink to="/catalog" className={({ isActive }) => (isActive ? "selected" : "")}>Catalog</NavLink>
                </div>
                <div className="nav-element">
                    <NavLink to="/cart" className={({ isActive }) => (isActive ? "selected" : "")}>Cart</NavLink>
                </div>
            </div>
        </LinkingWrapper>
    </Router>
);

export default Navigation;
