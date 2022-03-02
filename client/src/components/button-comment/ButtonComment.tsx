import React, { ButtonHTMLAttributes, FC } from 'react'
import classes from './ButtonComment.module.scss'
import { ReactComponent as messageIcon } from '../../media/message.svg'
import Icon from '@ant-design/icons'

const ButtonComment:FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.button}>
            <Icon component={messageIcon}/>
            {children}
        </button>
    )
}

export default ButtonComment
