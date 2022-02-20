import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsRedux, getErrorPost, getIsLoadingPost, selectPostIds } from "../redux/features/post/postSlice"
import PostItem from '../containers/PostItem/PostItem'

export default function Feed() {
    const dispatch = useDispatch()

    const isLoading = useSelector(getIsLoadingPost)
    const error = useSelector(getErrorPost)

    const postsId = useSelector(selectPostIds)

    useEffect(() => {
        dispatch(fetchPostsRedux())
    }, [dispatch])
    
    return (
        <div className='feed'>
            {isLoading 
            ?   <p>Loading ...</p>
            :   !error.message 
                ?   postsId.map(postId =>
                        <PostItem key={postId} postId={postId} />
                    )
                : ''
                
            }
        </div>
    )
}
