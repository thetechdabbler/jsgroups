import React from 'react'
import ReactDOM from 'react-dom';
import './spinner.css'
import {connect} from 'react-redux'

const Spinner = (props) => {
    console.log("asdf" + props.show);
    const spinnerStyle = !props.show ? {display: "none"} : {}; 
    const loader = (<div className="spinner" style={spinnerStyle}>
        <div className="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>)
    return (
        ReactDOM.createPortal(loader, document.getElementById('spinner'))
    )
}

const mapStateToProps = (state) => {
    return {
        show: state.spinner.show
    }
}

export default connect(mapStateToProps, null)(Spinner)
