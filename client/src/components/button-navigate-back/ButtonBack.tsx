import { FC } from 'react'
import { ButtonBackProps } from '../../types'
import Button from '../button/Button'

const ButtonBack:FC<ButtonBackProps> = ({ handleNavigateBack }) => {
    return (
        <Button 
            onClick={handleNavigateBack}
            style={{
                marginBottom: '10px', 
                width: '40px', 
                borderRadius: '50%'
            }}
        >
            {'<-'}
        </Button>
    )
}

export default ButtonBack