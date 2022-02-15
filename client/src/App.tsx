import { Route, Routes } from "react-router-dom"
import Layout from './containers/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Feed from './pages/Feed'


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path='feed' element={<Feed />} />
                <Route index element={<Home />}/>
            </Route>
        </Routes>
    );
}
