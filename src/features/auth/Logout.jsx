import { useNavigate } from "react-router";
import { RoutePath } from "@routes/routes";
import { toast } from "react-hot-toast";
import { useAuth } from "@context/AuthContext";



const Logout = () => {
    const { setUser } = useAuth();
    
    const navigate = useNavigate();
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })
        .then(res => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then(data=>{
            setUser(null);
            toast.success(data.message, { id: "logout", duration: 3000 });
            navigate(`${RoutePath.AUTH}/${RoutePath.LOGIN}`);
            

        })
        .catch(err => {
            toast.success(err.message, { id: "logout", duration: 3000 });
        });
}
export default Logout;
