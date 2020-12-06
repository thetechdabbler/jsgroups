import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { AxiosInstance } from '../../axiosInstance';
import { GROUP_USERS_ASSIGNMENTS_URL } from '../../apiUrlConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spinnerActions from '../../redux/actions/spinnerActions';
import { toast } from 'react-toastify';

const SolveAssignment = (props) => {
    console.log(props);
    const { id } = useParams();
    const [theme, setTheme] = useState("github");
    const { state: { groupUserAssignment } } = useLocation();
    const [code, setCode] = useState(groupUserAssignment.solution);
    const themes = ['github', 'monokai', 'tomorrow', 'xcode', 'solarized_dark', 'solarized_light']
    const onCodeChange = (value) => {
        setCode(value);
    }

    const onSubmit = (e) => {
        props.spinnerActions.showSpinner();
        AxiosInstance.put(`${GROUP_USERS_ASSIGNMENTS_URL}/${id}`, { solution: code })
            .then((data) => {
                toast.success("Successfully updated the assignment!!");
                props.spinnerActions.hideSpinner();
            })
            .catch((error) => {
                toast.error("Unable to save assignment!!");
                props.spinnerActions.hideSpinner();
            })
    }

    return (
        <div className="container mt-2">
            <div className="row mt-2">
                <div className="d-flex flex-column justify-content-start col-md-12">
                    <div className="col-md-12 d-flex justify-content-start align-items-baseline">
                        <div className="col-md-3 d-flex justify-content-start">
                            <Link to="/home/study-assignments">
                                <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center col-md-7 text-center pr-3 pl-3">
                            <h1 className="display-4 text-center">{groupUserAssignment.assignment.name}</h1>
                        </div>
                    </div>
                    <div className="border border-dark rounded mt-3">
                        <ReactMarkdown source={groupUserAssignment.assignment.content} />
                    </div>
                    <div className="col-md-12 d-flex justify-content-between align-items-baseline p-0 mt-2">
                        <div className="col-md-2 p-0">
                            <select className="custom-select" onChange={(e) => setTheme(e.target.value)}>
                                {themes.map((theme, index) => {
                                    return <option value={theme} key={index}>{theme}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-2 p-0 d-flex justify-content-end">
                            <button className="btn btn-success btn-block" onClick={onSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="border border-dark rounded mt-3 mb-2">
                        <AceEditor
                            mode="javascript"
                            theme={theme}
                            name="code"
                            onChange={onCodeChange}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            value={code}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                            style={{ width: "100%", height: "500px" }} />
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

export default connect(null, mapDispatchToProps)(withRouter(SolveAssignment));