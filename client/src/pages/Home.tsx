import { Link } from "react-router-dom";
import Button from "../components/button/Button";

export default function Home() {
    return (
        <div className="home">
            <h1 className="text">
                This is social-media feed app!
            </h1>
            <div className="boxes">
                <div className='box'>
                    <div>Don't have an account?</div>
                    <Link to='/register'>
                        <Button>
                            Register
                        </Button>
                    </Link> 
                </div>
                <div className='box'>
                    <div>Already have one?</div>
                    <Link to='/login'>
                        <Button>
                            Login
                        </Button>
                    </Link> 
                </div>
            </div>
        </div>
    )
}
