import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import FormRegister from '../components/form-register/FormRegister'
import Button from '../components/button/Button'
import Input from '../components/input-auth/Input'

import { registerRedux } from '../redux/features/auth/authSlice'
import { AppDispatch } from '../redux/store/store'
import { UserCreds } from '../types'

export default function Register() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        formState: { errors } ,
        control
    } = useForm<UserCreds>()

    const onSubmit = async (data: UserCreds) => {
        const unwrap = await dispatch(registerRedux(data))
        if (unwrap.meta.requestStatus === 'fulfilled') {
            navigate('/feed')
        }        
    }

    return (
        <FormRegister onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Create an Account</h1>
                <div>
                    <div>Already have one? &nbsp;
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
            <Input 
                label='email' 
                register={register} 
                required 
                pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                control={control}
            />
            {errors.email && <p>Введите валидный Email.</p>}
            <Input 
                type='password'
                label='password' 
                register={register} 
                required 
                minLength={6} 
                maxLength={16}
                control={control} 
            />
            {errors.password && <p>Введите пароль больше 6 и меньше 16 символов</p>}
            <Button type="submit">Sign Up</Button>
        </FormRegister>
    )
}
