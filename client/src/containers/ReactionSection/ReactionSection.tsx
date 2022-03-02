import { FC } from 'react'
import ButtonLike from '../../components/button-like/ButtonLike'
import ButtonComment from '../../components/button-comment/ButtonComment'
import classes from './ReactionSection.module.scss'
import { ReactionSectionProps } from '../../types'

const ReactionSection:FC<ReactionSectionProps> = ({ handleLikeButton, handleCommentButton, post, isLiked }) => {
    return (
        <div className={classes.container}>
            <ButtonLike 
                onClick={handleLikeButton} 
                isLiked={isLiked}
            >   
                &nbsp; {post.likes.length}
            </ButtonLike>
            <ButtonComment
                onClick={handleCommentButton}
            >
                &nbsp; {post.comments.length}
            </ButtonComment>
        </div>
    )
}

export default ReactionSection