import { HIDE_SPINNER, SHOW_SPINNER } from '../actionTypes';

const initialState = {
    show: false
}

const spinnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return {
                show: action.payload.show,
            }
        case HIDE_SPINNER:
            return {
                show: action.payload.show,
            }
        default:
            return state;
    }
}
export default spinnerReducer;