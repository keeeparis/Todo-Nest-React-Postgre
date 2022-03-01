import { ArrowLeftOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { ButtonBackProps } from '../../types'
import classes from './ButtonBack.module.scss'

const ButtonBack:FC<ButtonBackProps> = ({ handleNavigateBack }) => {
    return (
        <button 
            onClick={handleNavigateBack}
            className={classes.button}
        >
            <ArrowLeftOutlined />
        </button>
    )
}

export default ButtonBack