import { EntityId } from "@reduxjs/toolkit"
import axios from "axios"

import { addLikeProps, CommentInput, deleteCommentProps, Post } from "../../types"
import { handleError } from "../auth"

export const addNewPost = async (data: Post) => {
    try {
        const response = await axios.post('/api/posts', data)
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const deletePost = async (data: EntityId) => {
    try {
        const response = await axios.delete('/api/posts', { data: { postId: data } })
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const editPost = () => {

}

export const addLike = async (data: addLikeProps) => {
    try {
        const response = await axios.post('/api/likes', data)
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const addComment = async (data: CommentInput) => {
    try {
        const response = await axios.post('/api/comments', data)
        return response
    } catch (e) {
        throw handleError(e)
    }
}
export const deleteComment = async (data: deleteCommentProps) => {
    try {
        const response = await axios.delete('/api/comments', { data })
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const fetchPosts = async () => {
    try {
        const response = await axios.get('/api/posts')
        return response
    } catch (e) {
        throw handleError(e)
    }
}