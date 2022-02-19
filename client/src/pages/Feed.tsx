import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../redux/features/auth/authSlice"
import { User } from "../types"

//FIXME: demo
export default function Feed() {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('/api/users', { 
                    withCredentials: true,
                })
                setUsers(res.data)
            } catch (e) {
                dispatch(logOut())
                navigate('/login')
            }
        }
        getData()
    }, [navigate, dispatch])
    
    return (
        <>
            <div>Feed</div>
            {users.map(user =>
                <div key={user.id}>
                    {user.email}
                </div>
            )}
            <div className="allPosts"></div>
        </>
    )
}
