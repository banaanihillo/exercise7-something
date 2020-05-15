import React from "react"
import styledComponents from "styled-components"

const UserHeader = styledComponents.h2`
    color: deeppink
`

const User = (props) => {
    const {user} = props
    if (!user) {
        return (
            <div>
                Looks like the data from the server have not arrived yet.
                You can go back by clicking on the link below.
            </div>
        )
    }
    return (
        <div>
            <UserHeader> {user.userName} </UserHeader>
            <h3> This user has added the following blogs: </h3>
            {user.blogs.map(blog =>
                <li key = {blog.id}>
                    {blog.title}
                </li>
            )}
        </div>
    )
}

export default User
