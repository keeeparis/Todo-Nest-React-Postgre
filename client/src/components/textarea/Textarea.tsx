import { useController } from 'react-hook-form'
import cn from 'classnames'

import classes from './Textarea.module.scss'

import { InputPostProps } from '../../types'

const Textarea = ({ label, register, required, control, maxLength, placeholder }: InputPostProps) => {
    const { fieldState, field } = useController({
        name: label,
        control,
    })

    const fieldSymbolsCount = field.value ? field.value.toString().length : 0
    const countDiv = fieldSymbolsCount ? `${fieldSymbolsCount}/${maxLength}` : ''

    return (
        <div className={classes.inputControl}>
            <textarea 
                rows={3}
                className={ fieldState.invalid ? cn(classes.textarea, classes.error) : classes.textarea }
                placeholder={placeholder}
                {...register(label, { required, maxLength })}
            />
            <p className={classes.counter}>
                {countDiv}
            </p>
        </div>
)}


export default Textarea