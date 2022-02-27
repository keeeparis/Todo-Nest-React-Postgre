import { FC } from 'react'
import ButtonLike from '../../components/button-like/ButtonLike'
import classes from './Like.module.scss'
import { LikeProps } from '../../types'

const Like:FC<LikeProps> = ({ handleLikeButton, post, isLiked }) => {
    return (
        <div className={classes.container}>
            <ButtonLike 
                onClick={handleLikeButton} 
                isLiked={isLiked}
            >   
                &nbsp; {post.likes.length}
            </ButtonLike>
        </div>
    )
}

export default Like