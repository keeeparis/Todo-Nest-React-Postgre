import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostItem from '../containers/PostItem/PostItem'
import { selectPostById } from '../redux/features/post/postSlice'
import { RootState } from '../redux/store/store'

const Post = () => {
    const params = useParams() as { postId: string }
    const post = useSelector((state: RootState) => selectPostById(state, params.postId))

    if (!post) {
        return null
    }

    return (
        <PostItem postId={post.id} />
    )
}

export default Post