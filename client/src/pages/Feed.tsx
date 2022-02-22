import { useSelector } from "react-redux"
import { getErrorPost, getIsLoadingPost, selectPostIds } from "../redux/features/post/postSlice"
import PostItem from '../containers/PostItem/PostItem'

export default function Feed() {
    const isLoading = useSelector(getIsLoadingPost)
    const error = useSelector(getErrorPost)

    const postsId = useSelector(selectPostIds)
   
    return (
        <div className='feed'>
            {isLoading 
            ?   <p>Loading ...</p>
            :   !error.message &&
                    postsId.map(postId =>
                        <PostItem key={postId} postId={postId} excerpt={true} />
                    )
            }
        </div>
    )
}
