import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from "@reduxjs/toolkit";
import { addComment, getComments } from "../../../api/comment";

import { CommentReceived, CommentInput } from "../../../types";
import { RootState } from "../../store/store";

const commentAdapter = createEntityAdapter<CommentReceived>({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

type initialStateType = {
    isLoading: boolean,
    error: SerializedError
}

const initialState = commentAdapter.getInitialState<initialStateType>({ 
    isLoading: true, 
    error: { message: '' } 
})

const postSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCommentsRedux.pending, (state, action) => {
            state.error.message = ''
            state.isLoading = true
        })
        builder.addCase(getCommentsRedux.fulfilled, (state, action) => {
            state.isLoading = false
            commentAdapter.setAll(state, action.payload)
        })
        builder.addCase(getCommentsRedux.rejected, (state, action) => {
            state.isLoading = false
            state.error.message = action.error.message
        })
        builder.addCase(addCommentRedux.fulfilled, (state, action) => {
            commentAdapter.setAll(state, action.payload.comments)
        })
    }
})

export default postSlice.reducer

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds
} = commentAdapter.getSelectors((state: RootState) => state.comment)

export const getIsLoading = ((state: RootState) => state.comment.isLoading)
export const getError = ((state: RootState) => state.comment.error)

export const getCommentsRedux = createAsyncThunk(
    'comment/getComments',
    async (postId: number) => {
        const response = await getComments(postId)
        return response.data
    }
)

export const addCommentRedux = createAsyncThunk(
    'comment/addComment',
    async (data: CommentInput) => {
        const response = await addComment(data)        
        return response.data
    }
)

