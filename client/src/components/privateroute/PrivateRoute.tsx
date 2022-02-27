import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import { getCurrentUser, getIsLoading } from "../../redux/features/auth/authSlice"
import { PrivateRouteProps } from "../../types"

export const PrivateRoute: FC<PrivateRouteProps> = ({ element: RouteComponent }) => {
    const user = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)
    
    if (isLoading) {
        return null
    }

    return user 
        ? <RouteComponent /> 
        : <Navigate to="/login" />
}