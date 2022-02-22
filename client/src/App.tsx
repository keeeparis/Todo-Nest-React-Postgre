import { Route, Routes } from "react-router-dom"
import Layout from './containers/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Post from './pages/Post'
import Account from './pages/Account'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, getProfileRedux } from "./redux/features/auth/authSlice"
import { PrivateRoute } from './components/privateroute/PrivateRoute'
import { fetchPostsRedux } from "./redux/features/post/postSlice"


export default function App() {
    const dispatch = useDispatch()

    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(getProfileRedux())
    }, [dispatch])

    useEffect(() => {
        if (currentUser !== null) {
            dispatch(fetchPostsRedux())
        }
    }, [dispatch, currentUser])

        return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route 
                    path='account/:userId' 
                    element={<PrivateRoute element={Account} />}
                />
                <Route path='feed'>
                    <Route index element={<PrivateRoute element={Feed} />}/>
                    <Route path=':postId' element={<PrivateRoute element={Post} />} />
                </Route>
            </Route>
        </Routes>
    );
}