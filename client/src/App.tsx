import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { PrivateRoute } from './components/privateroute/PrivateRoute'
import { getCurrentUser, getProfileRedux } from "./redux/features/auth/authSlice"
import { fetchPostsRedux } from "./redux/features/post/postSlice"
import { Spinner } from "./components/spinner/Spinner"

const Layout = lazy(() => import('./containers/Layout/Layout'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Feed = lazy(() => import('./pages/Feed'))
const Post = lazy(() => import('./pages/Post'))
const Account = lazy(() => import('./pages/Account'))

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
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
    );
}