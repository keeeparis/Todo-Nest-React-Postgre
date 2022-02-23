import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { getCurrentUser, getIsLoading } from "../../redux/features/auth/authSlice"

interface Props {
    element: React.ComponentType
    path?: string
}

export const PrivateRoute: React.FC<Props> = ({ element: RouteComponent }) => {
    const user = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)
    
    if (isLoading) {
        return null
    }

    if (user) {
        return <RouteComponent />
    }

    return <Navigate to="/login" />
}