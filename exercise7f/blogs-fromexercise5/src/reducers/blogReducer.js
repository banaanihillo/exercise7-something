import blogService from "../services/blogService"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE":
            return action.data
        case "CREATE":
            return [...state, action.data]
        case "THANK":
            const findBlog = state.find(blog => blog.id === action.data.id)
            const updatedBlog = {...findBlog, thanks: findBlog.thanks + 1}

            const updatedBlogs = state.map(blog => {
                return (blog.id === action.data.id)
                    ? updatedBlog
                    : blog
            })

            return updatedBlogs
        
        case "DELETE":
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getBlogs()
        dispatch({
            type: "INITIALIZE",
            data: blogs
        })
    }
}

export const addBlog = (newBlogObject) => {
    return async dispatch => {
        const createdBlog = await blogService.createBlog(newBlogObject)
        dispatch({
            type: "CREATE",
            data: createdBlog
        })
    }
}

export const thankBlog = (blog) => {
    return async dispatch => {
        const thankedBlog = await blogService.thankBlog(blog)
        dispatch({
            type: "THANK",
            data: thankedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog)
        dispatch({
            type: "DELETE",
            data: blog
        })
    }
}

export default blogReducer
