import { EntityId } from '@reduxjs/toolkit'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../components/spinner/Spinner'
import { getIsLoading } from '../../redux/features/comment/commentSlice'
import CommentItem from '../CommentItem/CommentItem'
import classes from './Comment.module.scss'

const Comment: FC<{comments: EntityId[]}> = ({ comments }) => {
    const isLoading = useSelector(getIsLoading)
    const content = comments.length 
        ?   comments.map(comment =>
                <CommentItem key={comment} commentId={comment} />
            )
        :   'Оставьте первый комментарий!'

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