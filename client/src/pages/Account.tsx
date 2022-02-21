import { useForm } from "react-hook-form"
import Button from "../components/button/Button"
import FormPost from "../components/form-post/FormPost"
import Input from '../components/input-post/Input'
import { Post } from "../types"
import UserPosts, { ParamsEmailType } from '../containers/UserPosts/UserPosts'
import { useDispatch, useSelector } from "react-redux"
import { addNewPostRedux } from "../redux/features/post/postSlice"
import { getCurrentUser } from "../redux/features/auth/authSlice"
import { useParams } from "react-router-dom"
import Textarea from '../components/textarea/Textarea'

const Account = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        control 
    } = useForm<Post>()

    const dispatch = useDispatch()
    const { userId } = useParams() as ParamsEmailType

    const currentUser = useSelector(getCurrentUser)

    const onSubmit = (data: Post) => {
        if (currentUser) {
            const postData = {...data, userId: currentUser.id}
            dispatch(addNewPostRedux(postData))
        }
    }

    return (
        <div className="account">
            {currentUser && currentUser.id === Number(userId) &&
                <FormPost onSubmit={handleSubmit(onSubmit)}>
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
                    />
                    {errors.content && <p>Укажите текст поста.</p>}
                    <Button type='submit'>Написать</Button>
                </FormPost>
            }
            <UserPosts />
        </div>
    )
}

export default Account