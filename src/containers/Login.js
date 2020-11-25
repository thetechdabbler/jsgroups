import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spinnerActions from '../redux/actions/spinnerActions';
import Axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        props.spinnerActions.showSpinner();
        Axios.post('http://batshitcode.com/auth/local', {
            identifier: email,
            password: password,
        }).then(response => {
            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("role", response.data.user.role.id);
            toast.success("Welcome back!!");
            props.spinnerActions.hideSpinner();
            props.history.push('/home');
        }).catch(error => {
            toast.error("Invalid User Credentials");
            props.spinnerActions.hideSpinner();
        });
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="mb-5">Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="row justify-content-md-center">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" 
                                    name="email" 
                                    className="form-control" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-control" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-4">
                            <button type="submit" 
                                className="btn btn-dark">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        spinnerActions: bindActionCreators(spinnerActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Login);