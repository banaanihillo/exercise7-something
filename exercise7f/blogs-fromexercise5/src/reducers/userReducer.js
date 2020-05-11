//import loginService from "../services/login"
import blogService from "../services/blogService"

const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOG_IN":
            return action.data
        case "SET_USER":
            return action.data
        default:
            return state
    }
}
/*
export const login = (credentials) => {
    return async dispatch => {
        const loggedIn = await loginService.login(credentials)
        await blogService.setToken(loggedIn.token)
        dispatch({
            type: "LOG_IN",
            data: loggedIn
        })
    }
}
*/
export const setUser = (user) => {
    return async dispatch => {
        await blogService.setToken(user.token)
        dispatch({
            type: "SET_USER",
            data: user
        })
    }
}
export default userReducer
