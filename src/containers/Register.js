import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            isRegistered: false
        }
    }

    onChange = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isRegistered: true
        });
        this.props.history.push('/login');
    }

    render() {
        const boolIsRegistered = this.state.isRegistered;
        return (
            boolIsRegistered ?
                (<Redirect to="/login" />) :
                (<>
                    <Header />
                    <div className="container mt-5">
                        <h1 className="mb-5">Register</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="row justify-content-md-center">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" className="form-control" id="name" onChange={(e) => this.onChange(e, "name")} />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" onChange={(e) => this.onChange(e, "email")} />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" onChange={(e) => this.onChange(e, "password")} />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-dark">Register Yourself</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>)
        )
    }
}

export default Register;