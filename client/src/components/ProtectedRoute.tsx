import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAllowed: boolean
    children?: React.ReactNode,
    
}

interface Props2{
    rol:number
    children?: React.ReactNode
}

export const ProtectedRoute = ({isAllowed, children}:Props) => {

    if(!isAllowed) return <Navigate to='/login'/>

return children ? <>{children}</> : <Outlet/>
}

export const ProtectedAdmin = ({rol, children}:Props2) =>{

    if (rol === 1) return <Navigate to='/login'/>

return children ? <>{children}</> : <Outlet/>

}
