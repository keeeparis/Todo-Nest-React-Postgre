import { FC, FormHTMLAttributes } from "react";

import classes from './FormRegister.module.scss'

const FormRegister: FC<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
    return (
      <form {...props} className={classes.form}>
          {children}
      </form>
    )
}

export default FormRegister

