import { useController } from 'react-hook-form'
import classes from './Textarea.module.scss'
import cn from 'classnames'
import { toCapitalFirstLetter } from '../../utils'
import { InputPostProps } from '../../types'

const Textarea = ({ label, register, required, control }: InputPostProps) => {
    const { fieldState } = useController({
        name: label,
        control
    })

    return (
        <div className={classes.inputControl}>
            <label>{toCapitalFirstLetter(label)}</label>
            <textarea 
                className={ fieldState.invalid ? cn(classes.textarea, classes.error) : classes.textarea}
                {...register(label, {required})}
            />
        </div>
)}


export default Textarea