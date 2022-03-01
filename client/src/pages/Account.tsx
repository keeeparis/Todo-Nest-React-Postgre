import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import FormPost from "../components/form-post/FormPost"
import Textarea from '../components/textarea/Textarea'
import Button from "../components/button/Button"
import UserPosts, { ParamsEmailType } from '../containers/UserPosts/UserPosts'

import { addNewPostRedux } from "../redux/features/post/postSlice"
import { getCurrentUser } from "../redux/features/auth/authSlice"
import { Post } from "../types"
import { GoBackSection } from '../containers/GoBackSection/GoBackSection'

const Account = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitSuccessful },
        control,
        reset
    } = useForm<Post>()

    const dispatch = useDispatch()
    const { userId } = useParams() as ParamsEmailType
    const currentUser = useSelector(getCurrentUser)
    
    const isInMyAccount = !!currentUser && currentUser.id === Number(userId)

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
        <div className="account">
            {!isInMyAccount && 
                <GoBackSection>
                    {userId}'s posts
                </GoBackSection>
            }
            {isInMyAccount &&
                <FormPost onSubmit={handleSubmit(onSubmit)}>
                    <h1>Написать</h1>
                    <Textarea 
                        label="content"
                        register={register}
                        control={control}
                        required
                        maxLength={250}
                    />
                    {errors.content && <p>Укажите текст поста не больше 250 символов.</p>}
                    <Button type='submit'>Опубликовать</Button>
                </FormPost>
            }
            <UserPosts isInMyAccount={isInMyAccount} />
        </div>
    )
}

export default Account