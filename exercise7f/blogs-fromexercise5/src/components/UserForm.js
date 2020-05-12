import React from "react"
import {useField} from "../hooks/fieldHook"

const UserForm = (props) => {
    const {createUser} = props
    const userNameInput = useField("userName")
    const nameInput = useField("name")
    const passwordInput = useField("password")

    const addUser = (event) => {
        event.preventDefault()
        createUser({
            userName: userNameInput.value,
            name: nameInput.value,
            password: passwordInput.value
        })
    }

    return (
        <div>
            <form onSubmit = {addUser}>
                User name:
                <input {...userNameInput} />
                <br />
                Given name:
                <input {...nameInput} />
                <br />
                Password:
                <input {...passwordInput} />
                <br />
                <button type = "submit">
                    Create new user
                </button>
            </form>
        </div>
    )
}

export default UserForm
