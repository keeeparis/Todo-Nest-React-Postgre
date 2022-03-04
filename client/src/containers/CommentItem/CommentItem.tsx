import { EntityId } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import { StopPropagationComponent } from '../../components/stop-propagation/StopPropagation'
import { TimeAgo } from '../../components/timeago/TimeAgo'
import { getCurrentUser } from '../../redux/features/auth/authSlice'
import { selectCommentById } from '../../redux/features/comment/commentSlice'
import { deleteCommentRedux } from '../../redux/features/post/postSlice'
import { RootState } from '../../redux/store/store'
import classes from './CommentItem.module.scss'

const CommentItem = ({ commentId }: { commentId: EntityId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const comment = useSelector((state: RootState) => selectCommentById(state, commentId))
    const currentUser = useSelector(getCurrentUser)

    const dispatch = useDispatch()

    const handleButtonClick = () => {
        setIsModalVisible(true)
    }

    const handleModalOk = () => {
        if (comment) {
            const data = { commentId, postId: comment.postId }
            dispatch(deleteCommentRedux(data))
            setIsModalVisible(false)
        }
    }

    const handleModalCancel = () => {
        setIsModalVisible(false)
    }

    if (!comment || !currentUser) return null

    const isMyOwnComment = currentUser.id === comment.userId
    const isAdmin = currentUser.roles.some(role => role.value === 'ADMIN')

    const showCloseButtonModal = (isMyOwnComment || isAdmin) && 
        <>
            <StopPropagationComponent className={classes.close}>
                <Button 
                    onClick={handleButtonClick} 
                    title='Delete Post'
                >
                    X
                </Button> 
            </StopPropagationComponent>

            <StopPropagationComponent>
                <Modal 
                    isModalVisible={isModalVisible} 
                    handleModalOk={handleModalOk}
                    handleModalCancel={handleModalCancel}
                    text='Вы уверены, что хотите удалить комментарий?'
                />
            </StopPropagationComponent>
        </>

    return (
        <div className={classes.container}>
            <div>
                <Link to={`/account/${comment.userId}`}>
                    {comment.email}
                </Link>
                <TimeAgo timestamp={comment.createdAt} />
            </div>
            <div>
                {comment.content}
            </div>
            {showCloseButtonModal}
        </div>
    )
}

export default CommentItem