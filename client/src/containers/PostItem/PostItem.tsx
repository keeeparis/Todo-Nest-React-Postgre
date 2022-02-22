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

export default function PostItem ({ postId, excerpt }: { postId: EntityId, excerpt?: boolean }) {
    const dispatch = useDispatch()

    const post = useSelector((state: RootState) => selectPostById(state, postId))
    const currentUser = useSelector(getCurrentUser)
    
    const handleDeletePost = () => {
        dispatch(deletePostRedux(postId))
    }
    
    if (!post) {
        return null
    }

    const isMyOwnPost = post && !!currentUser && currentUser.id === post.userId
    const showExcerptOrFullContent = excerpt ? converLongContentShort(post.content) : post.content

    return (
        <div className={classes.container}>
            <Link to={`/feed/${postId}`}>{post.title}</Link>
            <p>{showExcerptOrFullContent}</p>
            <p>by {
                <Link to={`/account/${post.userId}`} >
                    {isMyOwnPost ? 'me' : post.email}
                </Link>
                }{<TimeAgo timestamp={post.createdAt} />}
            </p>
            {isMyOwnPost && <Button onClick={handleDeletePost} >X</Button>}
        </div>
    )
}

