import { Outlet } from "react-router"
const UserPage = () => {
    
    return(
        <div className="max-w-[1500px] mx-auto">
            <Outlet/>
        </div>
    )
}
export default UserPage;