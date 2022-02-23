import { EntityId } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { deletePostRedux, selectPostById } from '../../redux/features/post/postSlice'
import classes from './PostItem.module.scss'
import { TimeAgo } from '../../components/timeago/TimeAgo'
import { Link } from 'react-router-dom'
import Button from '../../components/button/Button'
import { getCurrentUser } from '../../redux/features/auth/authSlice'
import { converLongContentShort } from '../../utils'
// import { Modal } from "antd"
import Modal from '../../components/modal/Modal'
import { useState } from "react"

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
    
    if (!post) {
        return null
    }

    const isMyOwnPost = post && !!currentUser && currentUser.id === post.userId
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
            
            <div className={classes.close}>
                {isMyOwnPost && <Button onClick={handleButtonClick}>X</Button>}
            </div>

            <Modal 
                isModalVisible={isModalVisible} 
                handleModalOk={handleModalOk}
                handleModalCancel={handleModalCancel}
            ></Modal>
        </div>
    )
}

