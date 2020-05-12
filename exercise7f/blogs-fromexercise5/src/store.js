import {createStore, applyMiddleware, combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import loginReducer from "./reducers/loginReducer"
import thunk from "redux-thunk"

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    loggedIn: loginReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
