import React from "react"
import {useSelector} from "react-redux"

/*
const Message = (props) => {
    const {message, errorMessage} = props
    if (message === null && errorMessage === null) {
        return null
    } else  if (message) {
        return (
            <div className = "message">
                {message}
            </div>
        )
    } else {
        return (
            <div className = "errorMessage">
                {errorMessage}
            </div>
        )
    }
}
*/

const Message = () => {
    const message = useSelector(state => state.notification)
    //const happy = useSelector(state => state.notification.happy)
    let happy = true
    
    if (message === null) {
        return null
    } else {
        if (happy) {
            return (
                <div className = "message">
                    {message}
                </div>
            )
        } else {
            return (
                <div className = "errorMessage">
                    {message}
                </div>
            )
        }
    }
}


export default Message
