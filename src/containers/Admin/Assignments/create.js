import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import './create.css';
const Create = () => {
    const [markdown, setMarkdown] = useState("");
    const [assignmentName, setAssignmentName] = useState("")

    return (
        <div className="container-fluid mt-5">
            <form>
                <div class="d-flex justify-content-start col-md-10 p-0">
                    <div className="form-group col-md-7 p-0">
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
                        <button type="button" class="btn btn-primary">Create Assignment</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 d-md-flex justify-content-center">
                        <textarea
                            className="text-area"
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

export default Create;