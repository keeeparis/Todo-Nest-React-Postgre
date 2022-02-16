import React, { ButtonHTMLAttributes, FC } from 'react'
import classes from './Button.module.scss'

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//     children: ReactNode
// }

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={classes.button}>{children}</button>
    )
}

export default Button