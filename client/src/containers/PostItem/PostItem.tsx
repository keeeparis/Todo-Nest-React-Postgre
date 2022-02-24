import { useDispatch, useSelector } from 'react-redux'
import { EntityId } from "@reduxjs/toolkit"
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

export default function PostItem ({ postId, excerpt }: { postId: EntityId, excerpt?: boolean }) {
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
            const data = { postId: postId, userId: currentUser.id }
            dispatch(addLikeRedux(data))
        }
    }
    
    if (!post) {
        return null
    }

    const isPostAndCurrentUser = post && !!currentUser

    const isMyOwnPost = isPostAndCurrentUser && currentUser.id === post.userId
    const isAdmin = isPostAndCurrentUser && currentUser.roles.some(role => role.value === 'ADMIN')
    const showExcerptOrFullContent = excerpt ? converLongContentShort(post.content) : post.content

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

