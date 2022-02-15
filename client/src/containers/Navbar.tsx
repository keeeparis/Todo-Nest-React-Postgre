import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav>
                <Link to='/'>Home</Link>{' '}
                <Link to='feed'>Feed</Link>{' '}
                <Link to='register'>Register</Link>{' '}
                <Link to='login'>Log In</Link>
            </nav>
        </>
    )
}
