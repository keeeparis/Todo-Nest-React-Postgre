import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FC } from 'react'

import classes from './UserPosts.module.scss'
import PostItem from '../PostItem/PostItem'

import { selectPostsByUser } from '../../redux/features/post/postSlice'
import { RootState } from '../../redux/store/store'

export type ParamsEmailType = {
    userId: string
}

const UserPosts: FC<{isInMyAccount: boolean}> = ({ isInMyAccount }) => {
    const { userId } = useParams() as ParamsEmailType
      
    const postsByUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId)))
    const posts = postsByUser.map(post => (
        <PostItem key={post.id} postId={post.id} excerpt={true}/>
    ))

    const whosePage = isInMyAccount ? 'My Posts' : `${userId}'s posts`

    return (
        <div className={classes.container}>
            <h2>{whosePage}</h2>
            <div>{posts}</div>
        </div>
    )
}

export default UserPosts