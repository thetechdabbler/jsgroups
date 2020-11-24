import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../Auth';
import navItems from '../navItems';
import Modal from '../utilComponents/Modal/Modal';
import * as spinnerActions from '../redux/actions/spinnerActions';
import * as modalActions from '../redux/actions/modalActions';
import { connect } from 'react-redux';

const Header = (props) => {
    const [ showModal, setShowModal ] = useState(false);
    const authUserRole = localStorage.getItem('role');
    const navs = navItems[authUserRole];
    let isUserAuthenticated = isAuthenticated();

    const showModalPopup = (e) => {
        e.preventDefault();
        props.showModal()
    }
    
    const logout = (e) => {
        props.showSpinner();
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        props.hideSpinner();
        props.hideModal()
        toast.success('Logout successfully');
        props.history.push('/login');
    }

    const navBartems = isUserAuthenticated ? (
        navs.map((nav, index) => {
            if (nav.name.toLowerCase() == 'logout') {
                return (
                    <li className="nav-item" key={index}>
                        <NavLink className="nav-link text-capitalize font-weight-bold" to={nav.path} onClick={showModalPopup}>{nav.name}</NavLink>
                    </li>
                )
            }
            return (
                <li className="nav-item" key={index}>
                    <NavLink className="nav-link text-capitalize font-weight-bold" to={nav.path} >{nav.name}</NavLink>
                </li>
            )
        })
    ) :
        (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold" activeClassName="active" to="/login">Login</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold" to="/register">Register</NavLink>
                </li> */}
            </>
        );

    return (
        <>
            <Modal closeModal={props.hideModal}
              modalAction={logout}
                modalActionBtn="Logout"
                 modalTitle="Logout"
                  modalBody="Are you sure you want to logout?"/>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-20">
                <NavLink className="navbar-brand" to="/">Quizee</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {navBartems}
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
