import React from 'react'
import Button from '../button/Button'

const ButtonBack = ({ handleNavigateBack }: { handleNavigateBack: () => void }) => {
    return (
        <>
            <Button 
                onClick={handleNavigateBack}
                style={{marginBottom: '10px', width: '40px', borderRadius: '50%'}}
            >
                {'<-'}
            </Button>
        </>
    )
}

export default ButtonBack