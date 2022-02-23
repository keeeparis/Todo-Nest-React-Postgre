import { useForm } from "react-hook-form"
import Button from "../components/button/Button"
import FormPost from "../components/form-post/FormPost"
import Input from '../components/input-post/Input'
import { Post } from "../types"
import UserPosts, { ParamsEmailType } from '../containers/UserPosts/UserPosts'
import { useDispatch, useSelector } from "react-redux"
import { addNewPostRedux } from "../redux/features/post/postSlice"
import { getCurrentUser } from "../redux/features/auth/authSlice"
import { useNavigate, useParams } from "react-router-dom"
import Textarea from '../components/textarea/Textarea'
import { useEffect } from "react"

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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div className="account">
            <Button onClick={() => navigate(-1)}>Go back</Button> {/* TODO: navigate to back? */}
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