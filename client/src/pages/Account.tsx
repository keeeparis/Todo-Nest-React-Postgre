import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import PostItem from "../containers/PostItem/PostItem"

import { getCurrentUser } from "../redux/features/auth/authSlice"
import { GoBackSection } from '../containers/GoBackSection/GoBackSection'
import { RootState } from "../redux/store/store"
import { getIsLoadingPost, selectPostsByUser } from "../redux/features/post/postSlice"
import { Spinner } from "../components/spinner/Spinner"

export type ParamsEmailType = {
    userId: string
}

const Account = () => {
    const { userId } = useParams() as ParamsEmailType
    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoadingPost)
    
    const isInMyAccount = !!currentUser && currentUser.id === Number(userId)

    const postsByUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId)))
    const posts = postsByUser.map(post => (
        <PostItem key={post.id} postId={post.id} excerpt={true}/>
    ))

    const whosePosts = isInMyAccount ? 'My Posts' : `${userId}'s posts`
    const isPosts = posts.length ? posts : 'No Posts yet. :('

    return (
        <div className="account">
            <GoBackSection>
                {whosePosts} 
            </GoBackSection>

            <div>
                {isLoading 
                    ? <Spinner /> 
                    : isPosts
                }
            </div>
        </div>
    )
}

export default Account