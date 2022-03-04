import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GoBackSection } from '../containers/GoBackSection/GoBackSection'

import PostItem from '../containers/PostItem/PostItem'
import Comment from '../containers/Comment/Comment'
import FormComment from '../components/form-comment/FormComment'
import Input from '../components/input-comment/Input'
import Button from '../components/button/Button'

import { addCommentRedux } from '../redux/features/post/postSlice'
import { CommentInput } from '../types'
import { useForm } from 'react-hook-form'
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

    return (
        <>
            <GoBackSection>
                Пост
            </GoBackSection>

            <PostItem postId={params.postId} />

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
            
            <Comment postId={params.postId} />
        </>
    )
}

export default Post