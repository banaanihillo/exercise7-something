let timeoutIdentifier

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "NOTIFY":
            return action.notification
        default:
            return state
    }
}

export const showNotification = (notification, timeout = 5000) => {
    return async dispatch => {
        if (timeoutIdentifier !== null) {
            clearTimeout(timeoutIdentifier)
        }
        dispatch({
            type: "NOTIFY",
            notification: notification
        })
        timeoutIdentifier = setTimeout(() => {
            dispatch({
                type: "NOTIFY",
                notification: null
            })
        }, timeout)
    }
}

export default notificationReducer
