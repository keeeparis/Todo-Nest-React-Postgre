import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import commentReducer from '../features/comment/commentSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comment: commentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch