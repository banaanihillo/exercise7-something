import React from "react"

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
            <h3> {user.userName} </h3>
            <h4> This user has added the following blogs: </h4>
            {user.blogs.map(blog =>
                <li key = {blog.id}>
                    {blog.title}
                </li>
            )}
        </div>
    )
}

export default User
