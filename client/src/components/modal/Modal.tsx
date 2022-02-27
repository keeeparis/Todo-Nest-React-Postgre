import { FC } from 'react'
import cn from 'classnames'

import classes from './Modal.module.scss'
import Button from '../button/Button'

import { ModalProps } from '../../types'

const Modal:FC<ModalProps> = ({ isModalVisible, handleModalOk, handleModalCancel }) => {
    const stylesMain = isModalVisible ? cn(classes.main, classes.openblock) : classes.main
    const stylesContainer = isModalVisible ? cn(classes.container, classes.openflex) : classes.container

    return (
        <div 
            className={stylesMain} 
            onClick={handleModalCancel}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={stylesContainer}
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