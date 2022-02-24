import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, LoginOutlined, LogoutOutlined, SmileOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'

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

    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                <div>
                    <Link 
                        to='/' 
                        className={(location.pathname === '/') ? classes.bold : ''}
                    >
                        <HomeOutlined />{' '}
                        Home
                    </Link>
                    {currentUser &&
                        <>
                            <Link 
                                to='feed' 
                                className={(location.pathname.startsWith('/feed')) ? classes.bold : ''}
                            >
                                <TeamOutlined />{' '}
                                Feed
                            </Link>
                            <Link 
                                to={`account/${currentUser.id}`} 
                                className={(location.pathname.startsWith('/account')) ? classes.bold : ''}
                            >
                                <SmileOutlined />{' '}
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
