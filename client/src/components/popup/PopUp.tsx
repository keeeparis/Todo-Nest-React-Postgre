import { message } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getError } from '../../redux/features/auth/authSlice'
import { getErrorPost } from '../../redux/features/post/postSlice'

const PopUp = () => {
    const error = useSelector(getError)
    const postError = useSelector(getErrorPost)

    useEffect(() => {
        const info = () => {
            message.info(error.message)
        }
        if (error.message !== '') {
            info()
        }
    }, [error])

    useEffect(() => {
        const info = () => {
            message.error(postError.message)
        }
        if (postError.message !== '') {
            info()
        }
    }, [postError])

    return (
        <></>
    )
}

export default PopUp