import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../../components/timeago/TimeAgo'
import { selectCommentById } from '../../redux/features/comment/commentSlice'
import { RootState } from '../../redux/store/store'
import classes from './CommentItem.module.scss'

const CommentItem = ({ commentId }: { commentId: EntityId }) => {
    const comment = useSelector((state: RootState) => selectCommentById(state, commentId))
    if (!comment) return null

    return (
        <div className={classes.container}>
            <div>
                {comment.email}
                <TimeAgo timestamp={comment.createdAt} />
            </div>
            <div>
                {comment.content}
            </div>
        </div>
    )
}

export default CommentItem