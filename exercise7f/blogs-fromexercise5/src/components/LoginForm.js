import React from "react"
import PropTypes from "prop-types"

const LoginForm = (props) => {
    const {
        handleSubmit,
        handleUserNameChange,
        handlePasswordChange,
        userName,
        password
    } = props

    return (
        <div>
            <h2> Log in here </h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    Enter your user name:
                    <input
                        id = "userNameInput"
                        value = {userName}
                        onChange = {handleUserNameChange}
                    />
                </div>
                <div>
                    Enter your password:
                    <input
                        id = "passwordInput"
                        type = "password"
                        value = {password}
                        onChange = {handlePasswordChange}
                    />
                </div>
                <button id = "loginButton" type = "submit"> Log in </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUserNameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm
