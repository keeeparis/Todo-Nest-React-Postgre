import { useController } from 'react-hook-form'
import { InputProps } from '../../types'
import classes from './Input.module.scss'
import cn from 'classnames'
import { toCapitalFirstLetter } from '../../utils'

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