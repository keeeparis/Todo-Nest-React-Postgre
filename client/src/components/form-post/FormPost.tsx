import { FC, FormHTMLAttributes } from "react";

import classes from './FormPost.module.scss'

const FormRegister: FC<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
    return (
      <form {...props} className={classes.form}>
          {children}
      </form>
    )
}

export default FormRegister

