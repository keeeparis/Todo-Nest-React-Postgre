import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import PostItem from '../containers/PostItem/PostItem'
import FormPost from "../components/form-post/FormPost"
import Textarea from "../components/textarea/Textarea"
import Button from "../components/button/Button"

import { addNewPostRedux, getErrorPost, getIsLoadingPost, selectPostIds } from "../redux/features/post/postSlice"
import { Post } from "../types"
import { getCurrentUser } from "../redux/features/auth/authSlice"
import { Spinner } from '../components/spinner/Spinner'

export default function Feed() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitSuccessful },
        control,
        reset
    } = useForm<Post>()

    const dispatch = useDispatch()

    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoadingPost)
    const postsId = useSelector(selectPostIds)
    const error = useSelector(getErrorPost)

    const content = postsId.length 
        ?   postsId.map(postId =>
                <PostItem key={postId} postId={postId} excerpt={true} />
            )
        :   `Постов пока нет :(`
    
    const onSubmit = (data: Post) => {
        if (currentUser) {
            const postData = {...data, userId: currentUser.id}
            dispatch(addNewPostRedux(postData))
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])
   
    return (
        <div className='feed'>
            <FormPost onSubmit={handleSubmit(onSubmit)}>
                <h1>Написать</h1>
                <Textarea 
                    label="content"
                    register={register}
                    control={control}
                    required
                    maxLength={250}
                    placeholder='Что вы хотите сказать?'
                />
                {errors.content && <p>Укажите текст поста не больше 250 символов.</p>}
                <Button type='submit'>Опубликовать</Button>
            </FormPost>

            {isLoading 
            ?   <Spinner />
            :   !error.message && 
                    <div>
                        {content}
                    </div>
            }
        </div>
    )
}
