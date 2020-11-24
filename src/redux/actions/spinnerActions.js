const { SHOW_SPINNER, HIDE_SPINNER } = require("../actionTypes")

export const showSpinner = () => {
    return {
        type: SHOW_SPINNER,
        payload: { show: true }
    }
}

export const hideSpinner = () => {
    return {
        type: HIDE_SPINNER,
        payload: { show: false }
    }
}