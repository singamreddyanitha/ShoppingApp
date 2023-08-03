import { Navigate, Outlet } from "react-router-dom" // Inplace of Redirect method using Navigate 
import Cookies from "js-cookie"
// import Home from "../Home"


const ProtectedRoute = () => {
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken === undefined) {
      return <Navigate to = "/login"/>
    }
    return  <Outlet /> 
}

// <Route exact path="/" element={<Home />} />

export default ProtectedRoute