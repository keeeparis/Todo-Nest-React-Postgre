import axios from "axios";
import { UserCreds } from "../../types";
import { setLocalStorageToken } from '../../utils/index'

const handleError = (error: any) => {
    // let message
    // if (axios.isAxiosError(error)) {
    //     message = error.response?.data.message
    // } else {
    //     message = String(error)
    // }
    // return message

    return axios.isAxiosError(error) 
        ? error.response?.data.message
        : String(error)
}

export const registerUser = async (creds: UserCreds) => {
    try {
        const response = await axios.post('/api/auth/register', creds)

        setLocalStorageToken(response.data.token)

        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const loginUser = async (creds: UserCreds) => {
    try {
        const response = await axios.post('/api/auth/login', creds)

        setLocalStorageToken(response.data.token)

        return response
    } catch (e) {
        throw handleError(e)
    }
}

export const getProfile = async (token: string) => {
    try {
        const response = await axios.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (e) {
        throw handleError(e)
    }
}