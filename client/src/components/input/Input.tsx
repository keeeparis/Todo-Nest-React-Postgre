import { Path, UseFormRegister } from 'react-hook-form'
import { UserCreds } from '../../types'
import classes from './Input.module.scss'

type InputProps = {
    label: Path<UserCreds>,
    register: UseFormRegister<UserCreds>,
    required: boolean,
    pattern?: RegExp,
    minLength?: number,
    maxLength?: number,
    type?: string
}

const toCapitalFirstLetter = (word: string) => word[0].toUpperCase() + word.substring(1)

const Input = ({ label, register, required, pattern, minLength, maxLength, type }: InputProps) => (
    <>
        <label>{toCapitalFirstLetter(label)}</label>
        <input 
            className={classes.input}
            type={type}
            {...register(label, {required, pattern, minLength, maxLength})}
        />
    </>
)


export default Input