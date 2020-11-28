import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import './create.css';
import { AxiosInstance } from '../../../axiosInstance';
import * as spinnerActions from '../../../redux/actions/spinnerActions';
import { ASSIGNMENTS_URL } from '../../../apiUrlConstants';
import { Link, useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const AddEdit = (props) => {
    let { id } = useParams();
    let assignment = {
        content: "",
        name: ""
    };

    if(id) {
        let { name, content } = props.location.state;
        assignment.content = content;
        assignment.name = name; 
    }

    const [markdown, setMarkdown] = useState("");
    const [assignmentName, setAssignmentName] = useState("");

    useEffect(() => {
        if (id) {
            setMarkdown(assignment.content);
            setAssignmentName(assignment.name);
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        props.spinnerActions.showSpinner();
        if(id) {
            AxiosInstance.put(`${ASSIGNMENTS_URL}/${id}`, {
                content: markdown,
                name: assignmentName
            }).then((response) => {
                props.spinnerActions.hideSpinner();
                toast.success("Successfully updated assignment !!");
            })
            .catch((error) => {
                props.spinnerActions.hideSpinner();
                toast.error("Oops.. Something went wrong !!");
            });
        } else {
            AxiosInstance.post(ASSIGNMENTS_URL, {
                content: markdown,
                name: assignmentName
            }).then((response) => {
                setMarkdown("");
                setAssignmentName("");
                props.spinnerActions.hideSpinner();
                toast.success("Assignment created successfully !!");
            })
            .catch((error) => {
                props.spinnerActions.hideSpinner();
                toast.error("Oops.. Something went wrong !!");
            });
        }
        
    }

    return (
        <div className="container-fluid mt-3">
            <h1 className="display-6 mb-2 align-middle">{!id ? "Add Assignment" : "Edit Assignment"}</h1>
            <hr/>
            <form onSubmit={onSubmit}>
                <div className="d-flex justify-content-start align-items-baseline col-md-12 p-0">
                    <div className="d-flex justify-content-start col-md-1 p-0">
                        <div className="col-md-1 p-0">
                            <Link to="/admin/home/assignments">
                                <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start col-md-11 p-0">
                        <div className="form-group col-md-4 p-0">
                            <input type="text"
                                className="form-control"
                                id="assignment_name"
                                placeholder="Assignment Name"
                                name="assignment_name"
                                value={assignmentName}
                                onChange={(e) => setAssignmentName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 p-0">
                            <button type="submit" className="btn btn-primary">{!id ? "Create Assignment" : "Update Assignment"}</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 d-md-flex justify-content-center">
                        <textarea
                            className="text-area"
                            name="content"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 d-md-flex">
                        <ReactMarkdown source={markdown} className="markdown" />
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        spinnerActions: bindActionCreators(spinnerActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(AddEdit));