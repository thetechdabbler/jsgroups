import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../../components/Header';
import AddEdit from '../assignments/AddEdit';
import AssignGroupAssignments from '../assignments/AssignGroupAssignments';
import Assignments from '../assignments/Assignments';
import Home from './Home';

const AdminHome = (props) => {
    const { url } = props.match;
    return (
        <>
            <Header />            
            <Switch>
                <Route exact path={`${url}/assignments/create`} >
                    <AddEdit />
                </Route>
                <Route path={`${url}/assignments/edit/:id`} >
                    <AddEdit />
                </Route>
                <Route path={`${url}/assignments/groups/:id`}>
                    <AssignGroupAssignments />
                </Route>
                <Route exact path={`${url}/assignments`} >
                    <Assignments />
                </Route>
                <Route exact path={`${url}`}>
                    <Home />
                </Route>
            </Switch>
        </>
    )
}

export default AdminHome;
