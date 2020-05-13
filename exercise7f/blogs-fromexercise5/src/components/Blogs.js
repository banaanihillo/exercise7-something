import React from "react"
import {Link} from "react-router-dom"

const Blogs = (props) => {
    const {blogs, blogForm} = props
    return (
        <div>
            <h2> Blogs </h2>
            {blogForm()}
            <br />
            {blogs.map(blog =>
                <li key = {blog.id}>
                    <Link to = {`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </li>
            )}
        </div>
    )
}

export default Blogs
