import axios from "axios"
import { useEffect, useState } from "react"
import { User } from "../types"

export default function Home() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get('/api/users')
            setUsers(res.data)
        }
        getData()
    }, [])
    return (
        <>
            <div>Home</div>
            {users.map(user =>
                <div key={user.id}>
                    {user.email}
                </div>
            )}
        </>
    )
}
