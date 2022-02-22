import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser, logoutUser, registerUser } from "../../../api/auth";
import { authIS, UserCreds } from "../../../types";
import { RootState } from "../../store/store";

const initialState: authIS = {
    currentUser: null,
    error: { message: '' },
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(registerRedux.pending, (state, payload) => {
                state.error.message = ''
                state.isLoading = true
            })
            .addCase(registerRedux.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(registerRedux.rejected, (state, action) => {
                state.isLoading = false
                state.error.message = action.error.message 
            })
            .addCase(loginRedux.pending, (state, action) => {
                state.error.message = ''
                state.isLoading = true
            })
            .addCase(loginRedux.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(loginRedux.rejected, (state, action) => {
                state.isLoading = false
                state.error.message = action.error.message 
            })
            .addCase(getProfileRedux.pending, (state, action) => {
                state.error.message = ''
                state.isLoading = true
            })
            .addCase(getProfileRedux.fulfilled, (state, action) => {
                state.isLoading = false
                state.error.message = ''
                state.currentUser = action.payload
            })
            .addCase(getProfileRedux.rejected, (state, action) => {
                state.isLoading = false
                state.error.message = action.error.message
            })
            .addCase(logoutRedux.fulfilled, (state, action) => {
                state.currentUser = null
                state.isLoading = false
            })
    }
})

export default authSlice.reducer

// export const {  } = authSlice.actions

export const getError = (state: RootState) => state.auth.error
export const getCurrentUser = (state: RootState) => state.auth.currentUser
export const getIsLoading = (state: RootState) => state.auth.isLoading

export const registerRedux = createAsyncThunk(
    'auth/register',
    async (creds: UserCreds) => {
        const response = await registerUser(creds)
        const { data } = response
        return data
    }
)

export const loginRedux = createAsyncThunk(
    'auth/login',
    async (creds: UserCreds) => {
        const response = await loginUser(creds)
        const { data } = response
        return data
    }
)

export const getProfileRedux = createAsyncThunk(
    'auth/profile',
    async () => {
        const response = await getProfile()
        const { data } = response
        return data
    }
)

export const logoutRedux = createAsyncThunk(
    'auth/loggout',
    async () => {
        const response = await logoutUser()
        const { data } = response
        return data
    }
)