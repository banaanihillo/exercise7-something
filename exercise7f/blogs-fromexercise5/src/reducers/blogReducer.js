import blogService from "../services/blogService"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE_BLOGS":
            return action.blogs
        case "CREATE_BLOG":
            return [...state, action.data]
        case "THANK_BLOG":
            const findBlog = state.find(blog => blog.id === action.data.id)
            const updatedBlog = {...findBlog, thanks: findBlog.thanks + 1}

            const updatedBlogs = state.map(blog => {
                return (blog.id === action.data.id)
                    ? updatedBlog
                    : blog
            })

            return updatedBlogs
        
        case "DELETE_BLOG":
            return state.filter(blog => blog.id !== action.data.id)
        case "COMMENT_BLOG":
            const blogToComment = state.find(blog =>
                blog.id === action.data.blogWithComment.id
            )
            const commentedBlog = {
                ...blogToComment,
                comments: blogToComment.comments.concat(action.data.comment)
            }
            const commentaryBlogs = state.map(blog => {
                return (blog.id === action.data.blogWithComment.id)
                    ? commentedBlog
                    : blog
            })
            return commentaryBlogs
            
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getBlogs()
        dispatch({
            type: "INITIALIZE_BLOGS",
            blogs: blogs
        })
    }
}

export const addBlog = (newBlogObject) => {
    return async dispatch => {
        const createdBlog = await blogService.createBlog(newBlogObject)
        dispatch({
            type: "CREATE_BLOG",
            data: createdBlog
        })
    }
}

export const thankBlog = (blog) => {
    return async dispatch => {
        const thankedBlog = await blogService.thankBlog(blog)
        dispatch({
            type: "THANK_BLOG",
            data: thankedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog)
        dispatch({
            type: "DELETE_BLOG",
            data: blog
        })
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        const blogWithComment = await blogService.commentBlog(blog, comment)
        dispatch({
            type: "COMMENT_BLOG",
            data: {
                blogWithComment,
                comment
            }
        })
    }
}

export default blogReducer
