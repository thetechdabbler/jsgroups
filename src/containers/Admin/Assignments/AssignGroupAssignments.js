import { faLongArrowAltLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { AxiosInstance } from '../../../axiosInstance';
import * as spinnerActions from '../../../redux/actions/spinnerActions';

const AssignGroupAssignments = (props) => {
    const { id } = useParams();
    const [groupUsers, setGroupUsers] = useState([]);
    const { state: { name } } = useLocation();

    useEffect(() => {
        props.spinnerActions.showSpinner();
        AxiosInstance.get("/group-users").then((response) => {
            props.spinnerActions.hideSpinner();
            setGroupUsers([...response.data]);
            console.log(response.data);
        }).catch((error) => {
            props.spinnerActions.hideSpinner();
            toast.error("Unable to fetch group users..")
        })
    }, []);

    const groupUsersRows = groupUsers.map((groupUser) => {
        return (
            <tr key={groupUser.id} className={"row-" + groupUser.id}>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" />
                    </div>
                </td>
                <td>{`${groupUser.users_permissions_user.username} (${groupUser.users_permissions_user.email})` } </td> 
                <td>{groupUser.learning_group.name}</td>
            </tr>
        )
    });

    return (
        <div className="container mt-2">
            <div className="row mt-5">
                <div className="d-flex flex-column justify-content-start col-md-12">
                    <div className="col-md-12 d-flex justify-content-start align-items-baseline">
                        <div className="col-md-3 d-flex justify-content-start">
                            <Link to="/home/assignments">
                                <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center col-md-7 text-center pr-3 pl-3">
                            <h1 className="display-4 text-center">{name}</h1>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <table className="table">
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
                                        <td className="text-center">No Assignments Found</td>
                                        <td></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

export default connect(null, mapDispatchToProps)(AssignGroupAssignments);
