import blogService from "../services/blogService"

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.loggedIn
        default:
            return state
    }
}

export const setLoggedIn = (user) => {
    if (user === null) {
        return null
    }
    return async dispatch => {
        await blogService.setToken(user.token)
        dispatch({
            type: "SET_USER",
            loggedIn: user
        })
    }
}

export default loginReducer
