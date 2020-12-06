import React from 'react'
import { faDollarSign, faFileAlt, faThumbsUp, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './admin-home.css';

const Home = () => {
    return (
        <>
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
        </>
    )
}
export default Home