import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "../types"

export default function Feed() {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('/api/users', { headers: {
                    Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN as string)}`
                }})
                setUsers(res.data)
            } catch (e) {
                navigate('/login')
            }
        }
        getData()
    }, [navigate])
    
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
