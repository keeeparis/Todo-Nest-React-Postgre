import axios from "axios";
import { UserCreds } from "../../types";
import { setLocalStorageToken } from '../../utils/index'

const handleError = (error: any) => {
    let message
    if (axios.isAxiosError(error)) {
        message = error.response?.data.message
    } else {
        message = String(error)
    }
    return message
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