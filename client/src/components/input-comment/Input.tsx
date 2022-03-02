import { useController } from 'react-hook-form'
import cn from 'classnames'

import classes from './Input.module.scss'

import { InputCommentProps } from '../../types'

const Input = ({ label, register, required, type, control, placeholder, maxLength }: InputCommentProps) => {
    const { fieldState } = useController({
        name: label,
        control
    })

    return (
        <div className={classes.inputControl}>
            <input 
                className={ fieldState.invalid ? cn(classes.input, classes.error) : classes.input }
                type={type}
                placeholder={placeholder}
                {...register(label, { required, maxLength })}
            />
        </div>
)}

export default Input