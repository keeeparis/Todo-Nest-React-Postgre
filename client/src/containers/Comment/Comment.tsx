import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../components/spinner/Spinner'
import { getCommentsRedux, getIsLoading, selectCommentIds } from '../../redux/features/comment/commentSlice'
import { selectPostById } from '../../redux/features/post/postSlice'
import { RootState } from '../../redux/store/store'
import CommentItem from '../CommentItem/CommentItem'
import classes from './Comment.module.scss'

const Comment: FC<{postId: string}> = ({ postId }) => {
    const isLoading = useSelector(getIsLoading)
    const dispatch = useDispatch()
    const post = useSelector((state: RootState) => selectPostById(state, postId))
    const comments = useSelector(selectCommentIds)

    const content = comments.length 
        ?   comments.map(comment =>
                <CommentItem key={comment} commentId={comment} />
            )
        :   'Оставьте первый комментарий!'
    
    const num_comments = post && post.comments.length
    
    useEffect(() => {
        if (num_comments !== comments.length) {
            dispatch(getCommentsRedux(Number(postId)))
        }
    }, [comments.length, dispatch, num_comments, postId])

    return (
        <div className={classes.container}>
            {isLoading 
                ?   <Spinner />
                :   content
            }
        </div>
    )
}

export default Comment