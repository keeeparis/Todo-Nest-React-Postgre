import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonBack from '../../components/button-navigate-back/ButtonBack'
import classes from './GoBackSection.module.scss'

export const GoBackSection:FC = ({ children }) => {
    const navigate = useNavigate()
    const handleNavigateBack = () => navigate(-1)

    return (
        <div>
            <ButtonBack handleNavigateBack={handleNavigateBack} />
            <div className={classes.post}>{children}</div>
        </div>
    )
}