import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { GROUP_USERS_ASSIGNMENTS_URL, GROUP_USERS_URL } from '../../apiUrlConstants';
import { AxiosInstance } from '../../axiosInstance';
import * as spinnerActions from '../../redux/actions/spinnerActions';
import { AuthContext } from '../../auth/AuthContext';

const StudyAssignments = (props) => {
    const [groupUserAssignments, setGroupUserAssignments] = useState([]);
    const authContext = useContext(AuthContext);
    const authUser = JSON.parse(authContext.user);
    useEffect(() => {
        fetchAssignmentForUsers();
    }, []);

    const fetchAssignmentForUsers = async () => {
        props.spinnerActions.showSpinner();
        const groupUserResponse = await AxiosInstance.get(`${GROUP_USERS_URL}?users_permissions_user.id=${authUser.id}`);
        if (groupUserResponse.status == 200) {
            if (Array.isArray(groupUserResponse.data) && groupUserResponse.data.length) {
                const response = await AxiosInstance.get(`${GROUP_USERS_ASSIGNMENTS_URL}?group_user.id=${groupUserResponse.data[0].id}`)
                if (groupUserResponse.status == 200 && response.data.length) {
                    setGroupUserAssignments([...response.data]);
                }
                props.spinnerActions.hideSpinner();
            }
        } else {
            props.spinnerActions.hideSpinner();
            toast.error("Something went wrong. Please contact Admin");
        }

    }

    const assignmentRows = groupUserAssignments.map((groupUserAssignment) => {
        const {assignment} = groupUserAssignment;
        return (
            <li className="list-group-item" key={groupUserAssignment.id}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold">{assignment.name}</div>
                    <div>
                        <Link to={{ pathname: `/home/assignments/${groupUserAssignment.id}`, state: { groupUserAssignment } }}>
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