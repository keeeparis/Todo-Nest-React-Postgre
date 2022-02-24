import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonBack from '../components/button-navigate-back/ButtonBack'

import PostItem from '../containers/PostItem/PostItem'

import { selectPostById } from '../redux/features/post/postSlice'
import { RootState } from '../redux/store/store'

const Post = () => {
    const params = useParams() as { postId: string }
    const navigate = useNavigate()
    const post = useSelector((state: RootState) => selectPostById(state, params.postId))

    const handleNavigateBack = () => navigate(-1)

    if (!post) {
        return null
    }

    return (
        <>
            <ButtonBack handleNavigateBack={handleNavigateBack} />
            <PostItem postId={post.id} />
        </>
    )
}

export default Post