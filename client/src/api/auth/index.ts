import axios from "axios";
import { UserCreds } from "../../types";
import { setLocalStorageToken } from '../../utils/index'

export const registerUser = async (creds: UserCreds) => {
    try {
        const response = await axios.post('/api/auth/register', creds)

        setLocalStorageToken(response.data.token)

        return response
    } catch (e) {
        let message
        if (axios.isAxiosError(e)) {
            message = e.response?.data.message
        } else {
            message = String(e)
        }
        throw new Error(message)
    }
}