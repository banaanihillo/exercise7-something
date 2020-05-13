import React from "react"
const Blog = (props) => {
    const {blog, addThanks, deleteBlog, user} = props
    if (!blog) {
        return (
            <div>
                Nothing to show here yet.
                Clicking on the link below will take you back to the main page.
            </div>
        )
    }
    
    return (
        <div className = "blogDisplay">
            <div>
                <h3> {blog.title} </h3>
                <p> by {blog.author} </p>
                <p> {blog.url} </p>
                <p>
                    Times thanked: <span className = "blogThanks"> {blog.thanks} </span>
                    <button onClick = {() => addThanks(blog)}>
                        Thanks
                    </button>
                </p>
                <p> This blog was added by {blog.user.name}. </p>
                {(user.userName !== blog.user.userName)
                    ? null
                    : <p> <button onClick = {() => deleteBlog(blog)}>
                        Remove this blog
                    </button> </p>
                }
            </div>

        </div>
    )
    
}

export default Blog
