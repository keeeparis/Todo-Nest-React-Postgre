import { message } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getError } from '../../redux/features/auth/authSlice'

const PopUp = () => {
    const error = useSelector(getError)

    useEffect(() => {
        const info = () => {
            message.info(error)
        }
        if (error !== null) {
            info()
        }
    }, [error])

    return (
        <div></div>
    )
}

export default PopUp