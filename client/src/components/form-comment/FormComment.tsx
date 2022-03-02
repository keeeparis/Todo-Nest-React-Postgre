import { FC, FormHTMLAttributes } from "react"
import classes from './FormComment.module.scss'

const FormComment: FC<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
    return (
        <form {...props} className={classes.form}>
            {children}
        </form>
    )
}

export default FormComment
