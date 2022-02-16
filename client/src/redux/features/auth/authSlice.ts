import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../../api/auth";
import { authIS, UserCreds } from "../../../types";
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
        // register(state, action) {
        //     console.log(action.payload)
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(registerRedux.pending, (state, payload) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(registerRedux.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.currentUser = action.meta.arg.email
            })
            .addCase(registerRedux.rejected, (state, action: any) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default authSlice.reducer

// export const { register } = authSlice.actions

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