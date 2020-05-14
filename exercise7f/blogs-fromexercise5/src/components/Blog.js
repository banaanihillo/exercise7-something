import React from "react"
import {useField} from "../hooks/fieldHook"

const Blog = (props) => {
    const {blog, addThanks, deleteBlog, user, addComment} = props
    const commentInput = useField("comment")
    if (!blog) {
        return (
            <div>
                Nothing to show here yet.
                Clicking on the link below will take you back to the main page.
            </div>
        )
    }

    const createComment = (event) => {
        event.preventDefault()
        addComment(blog, commentInput.value)
    }

    return (
        <div className = "blogDisplay">
            <div>
                <h2> {blog.title} </h2>
                <p> by {blog.author} </p>
                <p> {blog.url} </p>
                <p>
                    Times thanked: <span className = "blogThanks"> {blog.thanks} </span>
                    <button onClick = {() => addThanks(blog)}>
                        Thanks
                    </button>
                </p>
                <h3> Comments </h3>
                <p>
                    {blog.comments.map(comment =>
                        <li key = {Math.random() * 100000}>
                            {comment}
                        </li>
                    )}
                </p>
                <form onSubmit = {createComment}>
                    <input {...commentInput} />
                    <br />
                    <button type = "submit">
                        Add comment
                    </button>
                </form>
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
