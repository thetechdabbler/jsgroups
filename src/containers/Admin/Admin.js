import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import StudyMaterial from '../home/StudyMaterial';
import AddEdit from './Assignments/AddEdit';
import AssignGroupAssignments from './Assignments/AssignGroupAssignments';
import Assignments from './Assignments/Assignments';

const Admin = (props) => {
    const { url } = props.match;
    return (
        <>
            <Header/>
            <Switch>
                    <Route path={`${url}/study-material`}>
                        <StudyMaterial />
                    </Route>
                    <Route exact path={`${url}/assignments/create`} >
                        <AddEdit/>
                    </Route>
                    <Route path={`${url}/assignments/edit/:id`} >
                        <AddEdit/>
                    </Route>
                    <Route path={`${url}/assignments/groups/:id`}>
                        <AssignGroupAssignments />
                    </Route>
                    <Route exact path={`${url}/assignments`} >
                        <Assignments />
                    </Route>
                </Switch>
        </>
    )
}

export default Admin;
