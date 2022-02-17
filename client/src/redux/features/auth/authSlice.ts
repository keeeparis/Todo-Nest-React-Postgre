import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser, registerUser } from "../../../api/auth";
import { authIS, UserCreds } from "../../../types";
import { getLocalStorageToken, removeLocalStorageToken } from "../../../utils";
import { RootState } from "../../store/store";

const initialState: authIS = {
    currentUser: null,
    error: null,
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logOut(state) {
            removeLocalStorageToken()
            state.currentUser = null
            state.isLoading = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerRedux.pending, (state, payload) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(registerRedux.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(registerRedux.rejected, (state, action: any) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(loginRedux.pending, (state, action) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(loginRedux.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(loginRedux.rejected, (state, action: any) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(getProfileRedux.pending, (state, action) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(getProfileRedux.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.error = null
                state.currentUser = action.payload
            })
            .addCase(getProfileRedux.rejected, (state, action: any) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default authSlice.reducer

export const { logOut } = authSlice.actions

export const getError = (state: RootState) => state.auth.error
export const getCurrentUser = (state: RootState) => state.auth.currentUser
export const getIsLoading = (state: RootState) => state.auth.isLoading

export const registerRedux = createAsyncThunk(
    'auth/register',
    async (creds: UserCreds, { rejectWithValue }) => {
        try {
            const response = await registerUser(creds)
            const { data } = response
            return data
        } catch (e) {
            return rejectWithValue(e) 
        }
    }
)

export const loginRedux = createAsyncThunk(
    'auth/login',
    async (creds: UserCreds, { rejectWithValue }) => {
        try {
            const response = await loginUser(creds)
            const { data } = response
            return data
        } catch (e) {
            return rejectWithValue(e) 
        }
    }
)

export const getProfileRedux = createAsyncThunk(
    'auth/profile',
    async () => {
        const token = getLocalStorageToken()
        if (token) {
            const response = await getProfile(token)
            const { data } = response
            return data
        } else {
            return null
        }
    }
)