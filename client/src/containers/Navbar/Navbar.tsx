import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser, getIsLoading, logOut } from "../../redux/features/auth/authSlice";
import classes from './Navbar.module.scss'
import cn from 'classnames'

export default function Navbar() {
    const dispatch = useDispatch()

    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)

    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <>
            <nav className={classes.nav}>
                <div className={cn(classes.links, classes.basicLinks)}>
                    <Link to='/'>Home</Link>
                    <Link to='feed'>Feed</Link>
                    <Link to='account'>Account</Link>
                </div>
                <div className={cn(classes.authLinks)}>
                    { currentUser 
                        ? ( 
                            <div>
                                <Link to='/' onClick={handleLogOut}>Log Out</Link> 
                            </div>
                        ) 
                        : !isLoading 
                            ? (
                                <div className={cn(classes.links)}>
                                    <Link to='register'>Register</Link>
                                    <Link to='login'>Log In</Link>
                                </div>
                                ) 
                            : '' 
                    }
                </div>
            </nav>
        </>
    )
}
