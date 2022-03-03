import axios from "axios"
import { CommentInput } from "../../types"
import { handleError } from "../auth"

export const getComments = async (postId: number) => {
    try {
        const response = await axios.get(`/api/comments`, { params: { postId }})
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const addComment = async (data: CommentInput) => {
    try {
        const response = await axios.post(`/api/comments`, data)
        return response
    } catch (e) {
        throw handleError(e)
    }
}