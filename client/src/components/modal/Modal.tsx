import { FC } from 'react'
import classes from './Modal.module.scss'
import cn from 'classnames'
import Button from '../button/Button'

interface ModalProps {
    isModalVisible: boolean;
    handleModalOk: () => void;
    handleModalCancel: () => void
}

const Modal:FC<ModalProps> = ({ isModalVisible, handleModalOk, handleModalCancel, children }) => {

    return (
        <div 
            className={cn(classes.main, isModalVisible ? classes.openblock : '')} 
            onClick={handleModalCancel}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={cn(classes.container, isModalVisible ? classes.openflex : '')}
            >
                <p className={classes.message}>Вы уверены, что хотите удалить пост?</p>
                <div className={classes.buttons}>
                    <Button onClick={handleModalOk}>Да</Button>
                    <Button onClick={handleModalCancel}>Нет</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal