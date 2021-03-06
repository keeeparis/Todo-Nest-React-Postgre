import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityId, SerializedError } from "@reduxjs/toolkit";

import { addComment, addLike, addNewPost, deleteComment, deletePost, fetchPosts } from "../../../api/post";
import { addLikeProps, CommentInput, deleteCommentProps, Post, PostReceived } from "../../../types";
import { RootState } from "../../store/store";

const postAdapter = createEntityAdapter<PostReceived>({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

type initialStateType = {
    isLoading: boolean,
    error: SerializedError
}

const initialState = postAdapter.getInitialState<initialStateType>({ isLoading: true, error: { message: '' } })

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addNewPostRedux.fulfilled, (state, action) => {
            postAdapter.addOne(state, action.payload)
        })
        builder.addCase(addNewPostRedux.rejected, (state, action) => {
            state.error.message = action.error.message
        })
        builder.addCase(fetchPostsRedux.pending, (state, action) => {
            state.error.message = ''
            state.isLoading = true
        })
        builder.addCase(fetchPostsRedux.fulfilled, (state, action: any) => {
            state.isLoading = false
            postAdapter.upsertMany(state, action.payload)  
        })
        builder.addCase(fetchPostsRedux.rejected, (state, action) => {
            state.isLoading = false
            state.error.message = action.error.message
        })
        builder.addCase(deletePostRedux.fulfilled, (state, action) => {
            postAdapter.removeOne(state, action.payload)
        })
        builder.addCase(addLikeRedux.fulfilled, (state, action) => {
            const postId = action.payload.postId
            postAdapter.updateOne(state, { id: postId, changes: { likes: action.payload.likes } })
        })
        builder.addCase(addCommentRedux.fulfilled, (state, action) => {
            const postId = action.payload.postId
            postAdapter.updateOne(state, { id: postId, changes: { comments: action.payload.comments } })
        })
        builder.addCase(deleteCommentRedux.fulfilled, (state, action) => {
            const postId = action.payload.postId
            postAdapter.updateOne(state, { id: postId, changes: { comments: action.payload.comments } })
        })
    }
})

export default postSlice.reducer

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors((state: RootState) => state.post)

export const getIsLoadingPost = ((state: RootState) => state.post.isLoading)
export const getErrorPost = ((state: RootState) => state.post.error)

export const addNewPostRedux = createAsyncThunk(
    'post/addNewPost',
    async (data: Post) => {
        const response = await addNewPost(data)
        return response.data
    }
)

export const deletePostRedux = createAsyncThunk(
    'post/deletePost',
    async (data: EntityId) => {
        const response = await deletePost(data)
        return response.data
    }
)

export const fetchPostsRedux = createAsyncThunk(
    'post/fetchAllPosts',
    async () => {
        const response = await fetchPosts()
        return response.data
    }
)

export const addLikeRedux = createAsyncThunk(
    'post/addLike',
    async (data: addLikeProps) => {
        const response = await addLike(data)
        return response.data
    }
)

export const addCommentRedux = createAsyncThunk(
    'post/addComment',
    async (data: CommentInput) => {
        const response = await addComment(data)
        return response.data
    }
)
export const deleteCommentRedux = createAsyncThunk(
    'post/deleteComment',
    async (data: deleteCommentProps) => {
        const response = await deleteComment(data)
        return response.data
    }
)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state: RootState, userId: number) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
)