import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
const PrivateRoute = ({children}:{ children: React.ReactNode }) => {
    const log = Cookies.get('a-login')
    return  log === "true" ? children : <Navigate to="/auth" />;

};

export default PrivateRoute