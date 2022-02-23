import axios from "axios";

import { UserCreds } from "../../types";

export const handleError = (error: any) => {
    return axios.isAxiosError(error) 
        ? error.response?.data.message
        : String(error)
}

export const registerUser = async (creds: UserCreds) => {
    try {
        const response = await axios.post('/api/auth/register', creds)
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const loginUser = async (creds: UserCreds) => {
    try {
        const response = await axios.post('/api/auth/login', creds)
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.get('/api/auth/logout')
        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const getProfile = async () => {
    try {
        const response = await axios.get('/api/users/profile', {
            withCredentials: true
        })
        return response
    } catch (e) {
        throw handleError(e)
    }
}
