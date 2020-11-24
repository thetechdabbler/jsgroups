const { SHOW_MODAL, HIDE_MODAL } = require("../actionTypes")

export const showModal = () => {
    return {
        type: SHOW_MODAL,
        payload: { show: true }
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
        payload: { show: false }
    }
}