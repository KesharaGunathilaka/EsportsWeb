import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
    
    const adminEmail = "admin@gmail.com";
    const token = localStorage.getItem("token");

    let loggedInUserEmail = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    loggedInUserEmail = decodedToken.email; // Assumes email is stored in the token
  }

    return loggedInUserEmail === adminEmail ? <Outlet /> : <Navigate to="/SignUp" />;
};

export default ProtectedRoutes;
