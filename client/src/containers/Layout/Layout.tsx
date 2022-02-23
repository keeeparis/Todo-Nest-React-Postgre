import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import PopUp from '../../components/popup/PopUp'
import classes from './Layout.module.scss'

export default function Layout() {
    return (
        <div className={classes.layout}>
            <Navbar />
            <div className={classes.main}>
                <Outlet />
            </div>
            <PopUp />
        </div>
    )
}
