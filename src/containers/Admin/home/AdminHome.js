import { faDollarSign, faFileAlt, faThumbsUp, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../../components/Header';
import AddEdit from '../assignments/AddEdit';
import AssignGroupAssignments from '../assignments/AssignGroupAssignments';
import Assignments from '../assignments/Assignments';
import './admin-home.css';

const AdminHome = (props) => {
    const { url } = props.match;
    return (
        <>
            <Header />
            <div className="wrapper container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="heading display-3">Statistics</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="dashboard-stat red">
                            <div className="visual">
                                <FontAwesomeIcon icon={faDollarSign} />
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span>312</span>
                                </div>
                                <div className="desc">Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="dashboard-stat blue">
                            <div className="visual">
                                <FontAwesomeIcon icon={faUserAlt} />
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span>12.5</span>
                                </div>
                                <div className="desc">Group Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="dashboard-stat hoki">
                            <div className="visual">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span>+ 53%</span>
                                </div>
                                <div className="desc">Completed Assignments</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="dashboard-stat purple">
                            <div className="visual">
                                <FontAwesomeIcon icon={faFileAlt} />
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span>689</span>
                                </div>
                                <div className="desc">Assignments</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            </Switch>
        </>
    )
}

export default AdminHome;
