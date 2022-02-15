import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/features/auth/authSlice'
import { UserCreds } from '../types'

export default function Register() {
    const [creds, setCreds] = useState<UserCreds>({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setCreds({
            ...creds,
            [id]: value
        })
    }
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(register(creds))
        navigate('/feed')
    }

    return (
        <div>
            <div>
                <h1>Create an Account</h1>
                <div>
                    <div>Already have one?</div>
                    <Link to='login'>Login</Link>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={creds.email}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={creds.password}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
