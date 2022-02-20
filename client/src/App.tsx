import { Route, Routes } from "react-router-dom"
import Layout from './containers/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Account from './pages/Account'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProfileRedux } from "./redux/features/auth/authSlice"
import { PrivateRoute } from './components/privateroute/PrivateRoute'
import { fetchPostsRedux } from "./redux/features/post/postSlice"


export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileRedux())
        dispatch(fetchPostsRedux())
    }, [dispatch])

        return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route 
                    path='account' 
                    element={<PrivateRoute element={Account} />}
                />
                <Route 
                    path='feed' 
                    element={<PrivateRoute element={Feed} />}
                />
            </Route>
        </Routes>
    );
}