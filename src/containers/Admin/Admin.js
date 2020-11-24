import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../utilComponents/Spinner/Spinner';
import CategoryCreator from '../Admin/CategoryCreator';
import QuestionCreator from './QuestionCreator';

class Admin extends Component {
    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route path="/admin/home/category">
                        <CategoryCreator />
                    </Route>
                    <Route path="/admin/home/questions">
                        <QuestionCreator />
                    </Route>
                </Switch>
            </>
        )
    }
}

export default Admin;