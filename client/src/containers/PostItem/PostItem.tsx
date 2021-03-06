import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from "react"
// import LazyLoad from 'react-lazyload'

import Button from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import ReactionSection from '../ReactionSection/ReactionSection'
import classes from './PostItem.module.scss'

import { addLikeRedux, deletePostRedux, selectPostById } from '../../redux/features/post/postSlice'
import { getCurrentUser } from '../../redux/features/auth/authSlice'
import { TimeAgo } from '../../components/timeago/TimeAgo'
import { converLongContentShort } from '../../utils'
import { RootState } from '../../redux/store/store'
import { PostItemProps } from '../../types'
import { StopPropagationComponent } from '../../components/stop-propagation/StopPropagation'

export default function PostItem ({ postId, excerpt }: PostItemProps) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

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

    const navigateToPostPage = () => {
        if (location.pathname !== `/feed/${postId}`) {
            navigate(`/feed/${postId}`) 
        }
    }

    const handleLikeButton = () => {
        if (currentUser) {
            const data = { postId: Number(postId), userId: currentUser.id }
            dispatch(addLikeRedux(data))
        }
    }

    const handleCommentButton = () => {
        navigateToPostPage()
    }
    
    if (!post || !currentUser) {
        return null
    }

    const isMyOwnPost = currentUser.id === post.userId
    const isAdmin = currentUser.roles.some(role => role.value === 'ADMIN')
    const showExcerptOrFullContent = excerpt ? converLongContentShort(post.content) : post.content
    const isCurrentUserLikedPost = post.likes.some(like => like.userId === currentUser.id)

    const showCloseButtonModal = (isMyOwnPost || isAdmin) && 
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
                    text='???? ??????????????, ?????? ???????????? ?????????????? ?????????'
                />
            </StopPropagationComponent>
        </>

    return (
        <div 
            className={classes.container} 
            onClick={navigateToPostPage}
        >
            <StopPropagationComponent className={classes.head}>
                <Link to={`/account/${post.userId}`}>
                    {post.email}
                </Link>
                <TimeAgo timestamp={post.createdAt} />
            </StopPropagationComponent> 

            <p className={classes.flex}>
                {showExcerptOrFullContent}
            </p>

            <StopPropagationComponent>
                <ReactionSection 
                    post={post}
                    isLiked={isCurrentUserLikedPost}
                    handleLikeButton={handleLikeButton}
                    handleCommentButton={handleCommentButton} 
                />
            </StopPropagationComponent>

            {showCloseButtonModal}
        </div>
    )
}
