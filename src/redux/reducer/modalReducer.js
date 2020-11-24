import { HIDE_MODAL, SHOW_MODAL } from '../actionTypes';

const initialState = {
    show: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                show: action.payload.show,
            }
        case HIDE_MODAL:
            return {
                show: action.payload.show,
            }
        default:
            return state;
    }
}
export default modalReducer;