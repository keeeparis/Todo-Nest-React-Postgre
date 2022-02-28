import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HomeTwoTone, LoginOutlined, LogoutOutlined, SmileTwoTone, TeamOutlined, UserAddOutlined } from '@ant-design/icons'

import { getCurrentUser, getIsLoading, logoutRedux } from "../../redux/features/auth/authSlice";
import classes from './Navbar.module.scss'
// import cn from 'classnames'

export default function Navbar() {
    const dispatch = useDispatch()
    const location = useLocation()

    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)

    const handleLogOut = () => {
        dispatch(logoutRedux())
    }

    const isHomeActive = (location.pathname === '/') ? classes.bold : ''
    const isFeedActive = (location.pathname.startsWith('/feed')) ? classes.bold : ''
    const isAccountActive = (location.pathname.startsWith('/account')) ? classes.bold : ''

    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                <div className={classes.mainlinks}>
                    <Link 
                        to='/' 
                        className={isHomeActive}
                    >
                        <HomeTwoTone />
                        <span className={classes.innertext}>Home</span>
                    </Link>
                    {currentUser &&
                        <>
                            <Link 
                                to='feed' 
                                className={isFeedActive}
                            >
                                <TeamOutlined />
                                <span className={classes.innertext}>Feed</span>
                            </Link>
                            <Link 
                                to={`account/${currentUser.id}`} 
                                className={isAccountActive}
                            >
                                <SmileTwoTone />
                                <span className={classes.innertext}>Account <br></br>{currentUser.email}</span>
                            </Link>
                        </>
                    }
                </div>
                <div className={classes.mainlinks}>
                    {currentUser 
                        ?   <Link to='/' onClick={handleLogOut}>
                                <LogoutOutlined />
                                <span className={classes.innertext}>Log Out</span>
                            </Link>  
                        :   !isLoading &&
                                <>
                                    <Link to='register'>
                                        <UserAddOutlined />
                                        <span className={classes.innertext}>Register</span>
                                    </Link>
                                    <Link to='login'>
                                        <LoginOutlined />
                                        <span className={classes.innertext}>Log In</span>
                                    </Link>
                                </>
                    }
                </div>
            </nav>
        </div>
    )
}
