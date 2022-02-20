import axios from "axios"
import { Post } from "../../types"
import { handleError } from "../auth"

export const addNewPost = async (data: Post) => {
    try {
        const response = await axios.post('/api/posts', data)
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const removePost = () => {

}

export const editPost = () => {

}

export const fetchPosts = async () => {
    try {
        const response = await axios.get('/api/posts')
        return response
    } catch (e) {
        throw handleError(e)
    }
}