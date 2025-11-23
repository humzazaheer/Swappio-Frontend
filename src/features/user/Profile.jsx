import { Outlet } from "react-router";

const Profile = () => {
    return (
        <section className="profile-section">
            <Outlet />  
        </section>
    );
};

export default Profile;