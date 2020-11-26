import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { AxiosInstance } from '../../../axiosInstance';
import { ASSIGNMENTS_URL } from '../../../apiUrlConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as spinnerActions from '../../../redux/actions/spinnerActions';

const Assignments = (props) => {
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

    const deleteAssignment = (e, id) => {
        e.preventDefault();
        props.spinnerActions.showSpinner();
        AxiosInstance.delete(`${ASSIGNMENTS_URL}/${id}`)
            .then((response) => {
                let filterAssignments = assignments.filter((assignment) => {
                    if(assignment.id != id) {
                        return assignment;
                    }
                });
                setAssignments([...filterAssignments]);
                toast.success("Successfully deleted assignment !")
                props.spinnerActions.hideSpinner();
            })
            .catch((error) => {
                toast.error("Unable to delete assignment!!")
                props.spinnerActions.hideSpinner();
            })
    }

    const assignmentRows = assignments.map((assignment) => {
        return (
            <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <td>{assignment.name}</td>
                <td>
                    <Link to={{ 
                            pathname: `/home/assignments/edit/${assignment.id}`, 
                            state: { name: assignment.name, content: assignment.content }
                        }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    {" "}
                    {/* <a href="#" onClick={(e, assignment.id) => deleteAssignment(e, id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </a> */}
                </td>
            </tr>
        )
    });

    return (
        <>
            <div className="container mt-5">
                <div className="row mb-2">
                    <div className="d-flex justify-content-start col-md-auto p-0">
                        <Link to="/home/assignments/create" className="btn btn-primary btn-md">Add Assignments</Link>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(assignmentRows.length && Array.isArray(assignmentRows)) ? assignmentRows : (
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
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        spinnerActions: bindActionCreators(spinnerActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Assignments));
