import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Assignments from '../admin/Assignments/Assignments';
import Create from '../admin/Assignments/create';
import StudyMaterial from './StudyMaterial';

const Home = (props) => {
    const { url } = props.match;
        return (
            <>
                <Header/>
                <Switch>
                    <Route path={`${url}/study-material`}>
                        <StudyMaterial />
                    </Route>
                    <Route path={`${url}/assignments/create`} >
                        <Create/>
                    </Route>
                    <Route path={`${url}/assignments`} >
                        <Assignments/>
                    </Route>
                    
                </Switch>
            </>
    )
}

export default Home;
