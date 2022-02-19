import { FC, FormEventHandler, ReactNode } from "react";
import classes from './FormPost.module.scss'

interface FormRegisterProps {
    children: ReactNode,
    onSubmit: FormEventHandler
}

const FormRegister: FC<FormRegisterProps> = ({ children, ...props }) => {
    return (
      <form {...props} className={classes.form}>
          {children}
      </form>
    )
}

export default FormRegister

