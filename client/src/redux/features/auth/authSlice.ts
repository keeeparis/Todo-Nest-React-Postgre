import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../../api/auth";
import { authIS, UserCreds } from "../../../types";

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
            .addCase(register.pending, (state, payload) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, payload: any) => {
                state.isLoading = false
                state.currentUser = payload
            })
            .addCase(register.rejected, (state, payload: any) => {
                state.isLoading = false
                state.error = payload.error.message
            })
    }
})

export default authSlice.reducer

// export const { register } = authSlice.actions

export const register = createAsyncThunk(
    'auth/register',
    async ( creds: UserCreds ) => {
        await registerUser(creds)
    }
)