import React from "react"
import {Link} from "react-router-dom"
import styledComponents from "styled-components"

const CheerfulContainer = styledComponents.div`
    background-color: pink
`

const Users = (props) => {
    const {users, userForm} = props
    return (
        <CheerfulContainer>
            <h2> Users </h2>
            {userForm()}
            <br />
            <table>
                <thead>
                    <tr>
                        <th>
                            User name
                        </th>
                        <th>
                            Number of blogs added
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key = {user.id}>
                            <td>
                                <Link to = {`/users/${user.id}`}>
                                    {user.userName}
                                </Link>
                            </td>
                            <td style = {{textAlign: "center"}}>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </CheerfulContainer>
    )
}
export default Users
