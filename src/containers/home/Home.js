import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Quiz from './Quiz';

class Home extends Component {
    render() {
        const { url } = this.props.match;
        return (
            <>
                <Header/>
                <div className="container mt-5">
                    <h1>Home</h1>
                    <div className="row justify-content-md-center">
                        <div className="col-md-2 col-lg-2">
                            
                            <NavLink activeClassName="active" exact to={`${url}/general`}>General</NavLink>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <NavLink activeClassName="active" exact to={`${url}/technical`}>Technical</NavLink>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <NavLink activeClassName="active" exact to={`${url}/maths`}>Maths</NavLink>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path={`${url}/:quiz`}>
                        <Quiz />
                    </Route>
                </Switch>
            </>
        )
    }
}

export default Home;