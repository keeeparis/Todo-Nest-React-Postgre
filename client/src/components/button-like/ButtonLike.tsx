import React, { ButtonHTMLAttributes, FC } from 'react'
import classes from './ButtonLike.module.scss'
import cn from 'classnames'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { ButtonLikeProps } from '../../types'

const ButtonLike:FC<ButtonLikeProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, isLiked, ...props }) => {
    const stylesIsLiked = isLiked ? cn(classes.button, classes.liked) : classes.button
    const imageIsLiked = isLiked ? <HeartFilled /> : <HeartOutlined />

    return (
        <button {...props} className={stylesIsLiked}>
            {imageIsLiked}
            {children}
        </button>
    )
}

export default ButtonLike