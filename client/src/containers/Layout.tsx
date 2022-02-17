import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import PopUp from '../components/popup/PopUp'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <PopUp />
        </>
    )
}
