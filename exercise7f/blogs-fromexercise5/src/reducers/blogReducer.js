import blogService from "../services/blogService"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE":
            return action.data
        case "CREATE":
            return [...state, action.data]
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

export default blogReducer
