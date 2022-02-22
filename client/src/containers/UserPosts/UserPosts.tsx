import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectPostsByUser } from '../../redux/features/post/postSlice'
import { RootState } from '../../redux/store/store'
import PostItem from '../PostItem/PostItem'
import classes from './UserPosts.module.scss'

export type ParamsEmailType = {
    userId: string
}

const UserPosts = () => {
    const { userId } = useParams() as ParamsEmailType
      
    const postsByUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId)))
    const postTitles = postsByUser.map(post => (
        <PostItem key={post.id} postId={post.id} excerpt={true}/>
    ))

    return (
        <div className={classes.container}>
            <h2>My Posts</h2>
            <div>{postTitles}</div>
        </div>
    )
}

export default UserPosts