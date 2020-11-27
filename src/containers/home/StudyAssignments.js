import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { ASSIGNMENTS_URL } from '../../apiUrlConstants';
import { AxiosInstance } from '../../axiosInstance';
import * as spinnerActions from '../../redux/actions/spinnerActions';

const StudyAssignments = (props) => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        props.spinnerActions.showSpinner();
        AxiosInstance.get(ASSIGNMENTS_URL)
            .then((response) => {
                if (response.data.length) {
                    setAssignments([...response.data]);
                }
                props.spinnerActions.hideSpinner();
            })
            .catch((error) => {
                props.spinnerActions.hideSpinner();
                toast.error("Unable to fetch assignments..")
            })
    }, []);

    const assignmentRows = assignments.map((assignment) => {
        return (
            <li className="list-group-item" key={assignment.id}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold">{assignment.name}</div>
                    <div>
                        <Link to={{ pathname: `/home/assignments/${assignment.id}`, state: {assignment}}}>
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                        </Link>
                    </div>
                </div>
                    
            </li>
        )
    });

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="d-flex flex-column justify-content-center align-items-center col-md-12 p-0">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <p className="display-4">Assignments</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                {assignmentRows}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        spinnerActions: bindActionCreators(spinnerActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(StudyAssignments));