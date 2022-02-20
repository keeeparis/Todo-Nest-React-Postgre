import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser, getIsLoading, logoutRedux } from "../../redux/features/auth/authSlice";
import classes from './Navbar.module.scss'
// import cn from 'classnames'

export default function Navbar() {
    const dispatch = useDispatch()

    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)

    const handleLogOut = () => {
        dispatch(logoutRedux())
    }

    return (
        <>
            <nav className={classes.nav}>
                <div>
                    <Link to='/'>Home</Link>
                    {currentUser &&
                        <>
                            <Link to='feed'>Feed</Link>
                            <Link to='account'>Account</Link>
                        </>
                    }
                </div>
                <div>
                    {currentUser 
                        ?   <Link to='/' onClick={handleLogOut}>Log Out</Link>  
                        :   !isLoading &&
                                <>
                                    <Link to='register'>Register</Link>
                                    <Link to='login'>Log In</Link>
                                </>
                    }
                </div>
            </nav>
        </>
    )
}
