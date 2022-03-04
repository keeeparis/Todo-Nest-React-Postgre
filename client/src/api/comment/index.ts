import axios from "axios"
import { handleError } from "../auth"

export const getComments = async (postId: number) => {
    try {
        const response = await axios.get(`/api/comments`, { params: { postId }})
        return response
    } catch (e) {
        throw handleError(e)
    }
}