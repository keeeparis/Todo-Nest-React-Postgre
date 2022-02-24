import { FC } from 'react'
import Button from '../../components/button/Button'
import { LikeProps } from '../../types'

const Like:FC<LikeProps> = ({ handleLikeButton, post }) => {  
    return (
        <div style={{display: 'flex'}}>
            <div>Лайки: {post.likes.length}</div>
            <Button onClick={handleLikeButton}>
                Like
            </Button>
        </div>
    )
}

export default Like