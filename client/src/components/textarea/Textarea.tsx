import { useController } from 'react-hook-form'
import cn from 'classnames'

import classes from './Textarea.module.scss'

import { toCapitalFirstLetter } from '../../utils'
import { InputPostProps } from '../../types'

const Textarea = ({ label, register, required, control, maxLength }: InputPostProps) => {
    const { fieldState, field } = useController({
        name: label,
        control,
    })

    const fieldSymbolsCount = field.value ? field.value.toString().length : 0
    const countDiv = fieldSymbolsCount ? <p className={classes.counter}>{fieldSymbolsCount}/{maxLength}</p> : <></>

    return (
        <div className={classes.inputControl}>
            <label>{toCapitalFirstLetter(label)}</label>
            <textarea 
                rows={5}
                className={ fieldState.invalid ? cn(classes.textarea, classes.error) : classes.textarea}
                {...register(label, {required})}
            />
            {countDiv}
        </div>
)}


export default Textarea