import ReactDom from 'react-dom';
import './modal.css';
import {connect} from 'react-redux';

const Modal = (props) => {
    const performAction = () => {
        props.modalAction();
    }
    const modalStyle = !props.show ? {display: "none"} : {};
    const modal = (
        <div className="modal-popup fade show"
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={modalStyle}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{props.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.modalBody}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-dismiss="modal" onClick={props.closeModal}>Close</button>
                        <button type="button" className="btn btn-dark" onClick={performAction}>
                            {props.modalActionBtn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (ReactDom.createPortal(modal, document.getElementById('modal')));
}

const mapStateToProps = (state) => {
    return {
        show: state.modal.show
    }
}

export default connect(mapStateToProps, null)(Modal);