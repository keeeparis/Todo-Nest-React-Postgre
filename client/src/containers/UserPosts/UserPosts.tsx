import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../redux/features/auth/authSlice'
import classes from './UserPosts.module.scss'

const UserPosts = () => { // FIXME:
    const currentUser = useSelector(getCurrentUser)
    let postTitles
    if (currentUser) {
        const copyArr = [...currentUser?.posts]
        const sortedPosts = copyArr.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        
        postTitles = sortedPosts?.map(post => (
            <li key={post.id}>
                {post.title}
            </li>
        ))
    }
    return (
        <div className={classes.container}>
            <h2>{currentUser?.email}</h2>
            <ul>{postTitles}</ul>
        </div>
    )
}

export default UserPosts