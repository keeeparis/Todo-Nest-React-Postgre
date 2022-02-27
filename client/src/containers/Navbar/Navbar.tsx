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
                <div>
                    <Link 
                        to='/' 
                        className={isHomeActive}
                    >
                        <HomeTwoTone twoToneColor="#eb2f96" />{' '}
                        Home
                    </Link>
                    {currentUser &&
                        <>
                            <Link 
                                to='feed' 
                                className={isFeedActive}
                            >
                                <TeamOutlined />{' '}
                                Feed
                            </Link>
                            <Link 
                                to={`account/${currentUser.id}`} 
                                className={isAccountActive}
                            >
                                <SmileTwoTone />{' '}
                                Account({currentUser.email})
                            </Link>
                        </>
                    }
                </div>
                <div>
                    {currentUser 
                        ?   <Link to='/' onClick={handleLogOut}>
                                <LogoutOutlined />{' '}
                                Log Out
                            </Link>  
                        :   !isLoading &&
                                <>
                                    <Link to='register'>
                                        <UserAddOutlined />{' '}
                                        Register
                                    </Link>
                                    <Link to='login'>
                                        <LoginOutlined />{' '}
                                        Log In
                                    </Link>
                                </>
                    }
                </div>
            </nav>
        </div>
    )
}
