import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { GROUP_USERS_ASSIGNMENTS_URL, GROUP_USERS_URL } from '../../../apiUrlConstants';
import { AxiosInstance } from '../../../axiosInstance';
import * as spinnerActions from '../../../redux/actions/spinnerActions';

const AssignGroupAssignments = (props) => {
    const { id } = useParams();
    const [groupUsers, setGroupUsers] = useState([]);
    const { state: { name } } = useLocation();
    const [assignedUsers, setAssignedUsers] = useState([]);

    useEffect(() => {
        getGroupUsers();
    }, []);

    const getGroupUsers = async() => {
        props.spinnerActions.showSpinner();
        const groupUserAssignmentsResponse = await AxiosInstance.get(`${GROUP_USERS_ASSIGNMENTS_URL}?assignment.id=${id}`);
        if (groupUserAssignmentsResponse.status == 200) {
            let groupUserIds = [];
            if (Array.isArray(groupUserAssignmentsResponse.data) && groupUserAssignmentsResponse.data.length) {
                groupUserIds = groupUserAssignmentsResponse.data.map(groupUserAssignment => {
                    return groupUserAssignment.group_user.id;
                });
            }

            const groupUsersResponse = await AxiosInstance.get(GROUP_USERS_URL);
            if (groupUsersResponse.status == 200) {
                setGroupUsers([...groupUsersResponse.data]);
                if (groupUserIds.length) {
                    const filteredGroupUsers = groupUsersResponse.data.filter((groupUser) => {
                        return !groupUserIds.includes(groupUser.id) ? groupUser : false;
                    });
                    setGroupUsers([...filteredGroupUsers]);
                }
            } else {
                toast.error("Unable to fetch group users..")
            }
            props.spinnerActions.hideSpinner();
        } else {
            toast.error("Unable to fetch assigned group users..")
            props.spinnerActions.hideSpinner();
        }
    }


    const selectCheckbox = (e) => {
        if (e.target.checked) {
            setAssignedUsers([...assignedUsers, e.target.value]);
        } else {
            const index = assignedUsers.indexOf(e.target.value);
            assignedUsers.splice(index, 1);
            setAssignedUsers([...assignedUsers]);
        }
    }

    const groupUsersRows = groupUsers.map((groupUser) => {
        return (
            <tr key={groupUser.id} className={"row-" + groupUser.id}>
                <td>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="assigned_user"
                            value={groupUser.id}
                            onChange={selectCheckbox}
                        />
                    </div>
                </td>
                <td>{`${groupUser.users_permissions_user.username} (${groupUser.users_permissions_user.email})`} </td>
                <td>{groupUser.learning_group.name}</td>
            </tr>
        )
    });

    const onSubmit = (e) => {
        e.preventDefault();
        props.spinnerActions.showSpinner();
        AxiosInstance.post(GROUP_USERS_ASSIGNMENTS_URL, {
            assignment_id: id,
            group_user_ids: assignedUsers
        }).then(data=> {
            props.spinnerActions.hideSpinner();
            toast.success("Assigned Assignments to group users");
            props.history.push('/admin/home/assignments');
        }).catch(error => {
            toast.error("Something went wrong!!!")
            props.spinnerActions.hideSpinner();
        })
    }

    return (
        <div className="container mt-2">
            <div className="row mt-5">
                <div className="d-flex flex-column justify-content-start col-md-12">
                    <div className="col-md-12 d-flex justify-content-start align-items-baseline">
                        <div className="col-md-3 d-flex justify-content-start">
                            <Link to="/admin/home/assignments">
                                <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center col-md-7 text-center pr-3 pl-3">
                            <h1 className="display-4 text-center">{name}</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-3">
                        <form className="d-flex flex-column justify-content-start col-md-12" onSubmit={onSubmit}>
                            <div className="d-flex">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Learning Group</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(groupUsersRows.length && Array.isArray(groupUsersRows)) ? groupUsersRows : (
                                            <tr className="text-center">
                                                <td></td>
                                                <td className="text-center">No Users Found to give Assignments</td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-end mb-2">
                                <div className="col-md-2 p-0">
                                    <button
                                        className="btn btn-success btn-round btn-block"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
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

export default connect(null, mapDispatchToProps)(withRouter(AssignGroupAssignments));
