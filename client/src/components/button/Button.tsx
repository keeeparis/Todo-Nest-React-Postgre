import { ButtonHTMLAttributes, FC } from 'react'

import classes from './Button.module.scss'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.button}>
            {children}
        </button>
    )
}

export default Button