import { useForm } from "react-hook-form"
import Button from "../components/button/Button"
import FormPost from "../components/form-post/FormPost"
import Input from '../components/input-post/Input'
import { Post } from "../types"
import UserPosts from '../containers/UserPosts/UserPosts'

const Account = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        control 
    } = useForm<Post>()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="account">
            <FormPost onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    type="text"
                    label="title"
                    register={register}
                    control={control}
                    required
                />
                {errors.title && <p>Укажите заголовок.</p>}
                <Input 
                    type="textarea"
                    label="content"
                    register={register}
                    control={control}
                    required
                />
                {errors.content && <p>Укажите текст поста.</p>}
                <Button type='submit'>Написать</Button>
            </FormPost>
            <UserPosts />
        </div>
    )
}

export default Account