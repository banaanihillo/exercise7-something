import React, {useState} from "react"
const Blog = (props) => {
    const {blog, addThanks, deleteBlog, user} = props
    const [displayAll, setDisplay] = useState(false)

    const toggleDisplay = () => {
        setDisplay(!displayAll)
    }
    return (
        <div className = "blogDisplay">
            {!displayAll
                ? <div> {blog.title}
                    <button onClick = {toggleDisplay}> Expand </button>
                </div>
                : <div>
                    <p> {blog.title}
                        <button onClick = {toggleDisplay}> Collapse </button>
                    </p>
                    <p> {blog.author} </p>
                    <p> {blog.url} </p>
                    <p>
                        Times thanked: <span className = "blogThanks"> {blog.thanks} </span>
                        <button onClick = {() => addThanks(blog)}>
                            Thanks
                        </button>
                    </p>
                    <p> This blog was added by {user.name}. </p>
                    {(user.name !== blog.user.name)
                        ? null
                        : <p> <button onClick = {() => deleteBlog(blog)}>
                            Remove this blog
                        </button> </p>
                    }
                </div>
            }
        </div>
    )

}
export default Blog
