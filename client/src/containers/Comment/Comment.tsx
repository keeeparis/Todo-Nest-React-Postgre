import { FC } from 'react'
import { PostReceived } from '../../types'

const Comment: FC<{post: PostReceived}> = ({ post }) => {
    // TODO: CommentItem create!
    const content = post.comments.length 
        ?   post.comments.map((comment, id) =>
                <div>
                    {id+1} {comment.content}
                </div>
            )
        :   'Оставьте первый комментарий!'

    return (
        <div>
            {content}
        </div>
    )
}

export default Comment