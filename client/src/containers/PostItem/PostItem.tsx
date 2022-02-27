import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from "react"

import Button from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import Like from '../Like/Like'
import classes from './PostItem.module.scss'

import { addLikeRedux, deletePostRedux, selectPostById } from '../../redux/features/post/postSlice'
import { getCurrentUser } from '../../redux/features/auth/authSlice'
import { TimeAgo } from '../../components/timeago/TimeAgo'
import { converLongContentShort } from '../../utils'
import { RootState } from '../../redux/store/store'
import { PostItemProps } from '../../types'

export default function PostItem ({ postId, excerpt }: PostItemProps) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()

    const post = useSelector((state: RootState) => selectPostById(state, postId))
    const currentUser = useSelector(getCurrentUser)
   
    const handleButtonClick = () => {
        setIsModalVisible(true)
    }

    const handleModalOk = () => {
        dispatch(deletePostRedux(postId))
        setIsModalVisible(false)
    }

    const handleModalCancel = () => {
        setIsModalVisible(false)
    }

    const handleLikeButton = () => {
        if (currentUser) {
            const data = { postId: Number(postId), userId: currentUser.id }
            dispatch(addLikeRedux(data))
        }
    }
    
    if (!post || !currentUser) {
        return null
    }

    const isMyOwnPost = currentUser.id === post.userId
    const isAdmin = currentUser.roles.some(role => role.value === 'ADMIN')
    const showExcerptOrFullContent = excerpt ? converLongContentShort(post.content) : post.content
    const isCurrentUserLikedPost = post.likes.some(like => like.userId === currentUser.id)

    return (
        <div className={classes.container}>
            <Link to={`/feed/${postId}`} className={classes.link}>
                {post.title}
            </Link>
            <p className={classes.flex}>{showExcerptOrFullContent}</p>
            <p>by {
                    <Link to={`/account/${post.userId}`} >
                        {isMyOwnPost ? 'me' : post.email}
                    </Link>
                }{
                    <TimeAgo timestamp={post.createdAt} />
                }
            </p>

            <Like 
                post={post}
                isLiked={isCurrentUserLikedPost}
                handleLikeButton={handleLikeButton} 
            />
            
            <div className={classes.close}>
                {(isMyOwnPost || isAdmin) && <Button onClick={handleButtonClick}>X</Button>}
            </div>

            <Modal 
                isModalVisible={isModalVisible} 
                handleModalOk={handleModalOk}
                handleModalCancel={handleModalCancel}
            ></Modal>
        </div>
    )
}

