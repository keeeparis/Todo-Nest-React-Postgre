import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import FormPost from "../components/form-post/FormPost"
import Textarea from '../components/textarea/Textarea'
import Input from '../components/input-post/Input'
import Button from "../components/button/Button"
import ButtonBack from '../components/button-navigate-back/ButtonBack'
import UserPosts, { ParamsEmailType } from '../containers/UserPosts/UserPosts'

import { addNewPostRedux } from "../redux/features/post/postSlice"
import { getCurrentUser } from "../redux/features/auth/authSlice"
import { Post } from "../types"

const Account = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitSuccessful },
        control,
        reset
    } = useForm<Post>()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams() as ParamsEmailType
    const currentUser = useSelector(getCurrentUser)
    
    const isInMyAccount = !!currentUser && currentUser.id === Number(userId)

    const onSubmit = (data: Post) => {
        if (currentUser) {
            const postData = {...data, userId: currentUser.id}
            dispatch(addNewPostRedux(postData))
        }
    }

    const handleNavigateBack = () => navigate(-1)

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div className="account">
            {!isInMyAccount && 
                <ButtonBack handleNavigateBack={handleNavigateBack} />
            }
            {isInMyAccount &&
                <FormPost onSubmit={handleSubmit(onSubmit)}>
                    <h1>Написать</h1>
                    <Input 
                        type="text"
                        label="title"
                        register={register}
                        control={control}
                        required
                    />
                    {errors.title && <p>Укажите заголовок.</p>}
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