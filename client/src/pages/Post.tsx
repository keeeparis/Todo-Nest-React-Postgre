import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GoBackSection } from '../containers/GoBackSection/GoBackSection'

import PostItem from '../containers/PostItem/PostItem'
import Comment from '../containers/Comment/Comment'
import FormComment from '../components/form-comment/FormComment'

import { addCommentRedux, selectPostById } from '../redux/features/post/postSlice'
import { RootState } from '../redux/store/store'
import Input from '../components/input-comment/Input'
import { CommentInput } from '../types'
import { useForm } from 'react-hook-form'
import Button from '../components/button/Button'
import { useEffect } from 'react'
import { getCurrentUser } from '../redux/features/auth/authSlice'

const Post = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitSuccessful },
        control,
        reset
    } = useForm<CommentInput>()

    const params = useParams() as { postId: string }
    const post = useSelector((state: RootState) => selectPostById(state, params.postId))
    const currentUser = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    
    const onSumbit = (data: CommentInput) => {
        if (currentUser) {
            const postData = {
                ...data, 
                userId: currentUser.id, 
                postId: Number(params.postId)
            }
            dispatch(addCommentRedux(postData))
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])
    
    if (!post) {
        return null
    }

    return (
        <>
            <GoBackSection>
                Пост
            </GoBackSection>

            <PostItem postId={post.id} />

            <h2>Comments</h2>

            <FormComment onSubmit={handleSubmit(onSumbit)}>
                <Input 
                    label="content"
                    register={register}
                    control={control}
                    required
                    maxLength={250}
                    placeholder='Оставить комментарий...'
                />
                {errors.content && <p>Комментарий не может быть пустым и содержать больше 250 символов.</p>}
                <Button type='submit'>Опубликовать</Button>
            </FormComment>

            <Comment post={post} />
        </>
    )
}

export default Post