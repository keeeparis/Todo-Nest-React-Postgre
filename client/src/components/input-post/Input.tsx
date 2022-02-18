import { useController } from 'react-hook-form'
import classes from './Input.module.scss'
import cn from 'classnames'
import { toCapitalFirstLetter } from '../../utils'
import { InputPostProps } from '../../types'

const Input = ({ label, register, required, type, control }: InputPostProps) => {
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
                {...register(label, {required})}
            />
        </div>
)}


export default Input