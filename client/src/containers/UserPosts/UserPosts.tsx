import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FC } from 'react'

import classes from './UserPosts.module.scss'
import PostItem from '../PostItem/PostItem'

import { selectPostsByUser } from '../../redux/features/post/postSlice'
import { RootState } from '../../redux/store/store'
import { UserPostsProps } from '../../types'

export type ParamsEmailType = {
    userId: string
}

const UserPosts: FC<UserPostsProps> = ({ isInMyAccount }) => {
    const { userId } = useParams() as ParamsEmailType
      
    const postsByUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId)))
    const posts = postsByUser.map(post => (
        <PostItem key={post.id} postId={post.id} excerpt={true}/>
    ))

    const whosePage = isInMyAccount ? 'My Posts' : `${userId}'s posts`
    const isPosts = posts.length ? posts : 'No Posts yet. :('

    return (
        <div className={classes.container}>
            <h2>{whosePage}</h2>
            <div>{isPosts}</div>
        </div>
    )
}

export default UserPosts