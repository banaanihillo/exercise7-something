import React from "react"
import {Link} from "react-router-dom"

const Blogs = (props) => {
    const {blogs, blogForm, BlogListItem} = props
    return (
        <div>
            <h2> Blogs </h2>
            {blogForm()}
            <br />
            {blogs.map(blog =>
                <BlogListItem key = {blog.id}>
                    <Link to = {`/blogs/${blog.id}`} style = {{color: "darkviolet"}}>
                        {blog.title}
                    </Link>
                </BlogListItem>
            )}
        </div>
    )
}

export default Blogs
