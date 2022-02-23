import { useController } from 'react-hook-form'
import cn from 'classnames'

import classes from './Input.module.scss'

import { toCapitalFirstLetter } from '../../utils'
import { InputProps } from '../../types'

const Input = ({ label, register, required, pattern, minLength, maxLength, type, control }: InputProps) => {
    const { fieldState } = useController({
        name: label,
        control
    })

    return (
        <div className={classes.inputControl}>
            <label>{toCapitalFirstLetter(label)}</label>
            <input 
                className={ fieldState.invalid ? cn(classes.input, classes.error) : classes.input}
                type={type}
                {...register(label, {required, pattern, minLength, maxLength})}
            />
        </div>
)}


export default Input