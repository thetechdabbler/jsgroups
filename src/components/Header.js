import React, { useContext, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import navItems from '../navItems';
import Modal from '../utilComponents/Modal/Modal';
import * as spinnerActions from '../redux/actions/spinnerActions';
import * as modalActions from '../redux/actions/modalActions';
import { connect } from 'react-redux';
import { faSignOutAlt, faSmile, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../auth/AuthContext';

const Header = (props) => {
    const [userProfileDropdown, setUserProfileDropdown] = useState(false);
    const authContext = useContext(AuthContext);
    const authUserRole = authContext.role;
    const navs = navItems[authUserRole];
    const user = JSON.parse(authContext.user);
    let isUserAuthenticated = (authContext.token) ? true : false;

    const showModalPopup = (e) => {
        e.preventDefault();
        setUserProfileDropdown(prevState => !prevState);
        props.showModal()
    }

    const logout = (e) => {
        props.showSpinner();
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        authContext.setToken(null);
        authContext.setUser(null);
        authContext.setRole(null);
        props.hideSpinner();
        props.hideModal()
        toast.success('Logout successfully');
        props.history.push('/login');
    }

    const logoutNavItem = (
        <>
            <li className="nav-item">
                <div className={userProfileDropdown ? "dropdown show" : "dropdown" }>
                    <a className="nav-link text-capitalize dropdown-toggle" 
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true" 
                        aria-expanded="false" 
                        onClick={(e)=> { e.preventDefault(); setUserProfileDropdown(prevState => !prevState); } }>
                        Hello {isUserAuthenticated ? user.name : ""}
                        {" "}
                        <FontAwesomeIcon icon={faSmile}/>
                    </a>
                    <div className={userProfileDropdown ? "dropdown-menu show" : "dropdown-menu" } aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Profile</a>
                        <NavLink className="dropdown-item text-capitalize" to="/logout" onClick={showModalPopup}>
                            Logout {" "}
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </NavLink>
                    </div>
                </div>
            </li>
        </>
    )

    const navUnauthNavItems = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
            </li>
        </>
    );

    const navBarItems = (Array.isArray(navs) && navs) ? navs.map((nav, index) => {
        return (
            <li className="nav-item" key={nav.path}>
                <NavLink className="nav-link text-capitalize" to={nav.path}>{nav.name}</NavLink>
            </li>
        )
    }) : null;

    return (
        <>
            <Modal closeModal={props.hideModal}
                modalAction={logout}
                modalActionBtn="Logout"
                modalTitle="Logout"
                modalBody="Are you sure you want to logout?" />

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-20">
                <NavLink className="navbar-brand" to="/">JS Learning Groups </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {isUserAuthenticated ? (
                            navBarItems
                        ) : navUnauthNavItems}
                        {isUserAuthenticated ? logoutNavItem : ""}
                    </ul>
                </div>
            </nav>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        showSpinner: () => { dispatch(spinnerActions.showSpinner()) },
        hideSpinner: () => { dispatch(spinnerActions.hideSpinner()) },
        showModal: () => { dispatch(modalActions.showModal()) },
        hideModal: () => { dispatch(modalActions.hideModal()) },
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Header));