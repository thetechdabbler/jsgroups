import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../../components/Header';
import StudyAssignments from '../assignments/StudyAssignments';
import SolveAssignment from '../assignments/SolveAssignment';

const Home = (props) => {
    const { url } = props.match;
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path={`${url}/assignments/:id`} >
                        <SolveAssignment />
                    </Route>
                    <Route exact path={`${url}/study-assignments`} >
                        <StudyAssignments/>
                    </Route>
                </Switch>
            </>
    )
}

export default Home;
