import userService from "../services/userService"

const userReducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE_USERS":
            return action.users
        case "CREATE_USER":
            return [...state, action.data]
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch({
            type: "INITIALIZE_USERS",
            users: users
        })
    }
}

export const addUser = (newUser) => {
    return async dispatch => {
        const createdUser = await userService.createUser(newUser)
        dispatch({
            type: "CREATE_USER",
            data: createdUser
        })
    }
}
export default userReducer
