
import { useAuth } from "@context/AuthContext";
import { Button } from "@components/Button";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";



const ProfileContent = () => {
    const { user, refreshUser } = useAuth();

    const [preview, setPreview] = useState(null);

    // Initial load → use DB image from backend
    useEffect(() => {
        if (user.profile_image) {
            setPreview(import.meta.env.VITE_BASE_URL + user.profile_image);
        }
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Instant preview
        setPreview(null);

        const formData = new FormData();
        formData.append("profile_image", file);
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/profile-image`;

        try {
            toast.loading("Updating profile image... ⏳", { id: "profile-img", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "PUT",
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) throw new Error("Something went wrong");
            const result = await response.json();

            const finalUrl = import.meta.env.VITE_BASE_URL + result.data.url;
            console.log(finalUrl)
            setPreview(finalUrl);

            toast.success("Profile image updated successfully! 🎉", { id: "profile-img", duration: 5000 });
            refreshUser();



        } catch (err) {
            toast.error(err.message, { id: "profile-img" });

            console.error("Upload failed:", err);
        }
    };


    return (
        <div className="max-w-5xl mx-auto mt-10  rounded-2xl bg-gradient-to-r from-violet-300/20 to-blue-100/30 shadow-lg rounded-xl p-10 border border-gray-200">
            <h1 className="text-4xl font-bold mb-6  text-gray-900">User Profile</h1>
            {/* Top Section */}
            <div className="flex items-center gap-6">
                {/* Profile Image */}
                <div className="relative w-32 h-32">
                    <img
                        src={
                            // selected now
                            preview ||
                            `https://placehold.co/500x500/ddd6ff/5d0ec0?text=${user.firstName}`
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-violet-400"
                    />

                    {/* Transparent file input */}
                    <input
                        type="file"
                        accept="image/*"
                        id="profile_image"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                    />

                    {/* Camera Badge */}
                    <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer">
                        <Camera size={18} />
                    </div>
                </div>

                {/*  */}
                {/* <img onChange={() => handleUpload(e)}
                    src={user.profile_image ? import.meta.env.VITE_BASE_URL + user.profile_image : `https://placehold.co/500x500/ddd6ff/5d0ec0?text=${user.firstName}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-2 border-violet-300 shadow-sm"
                /> */}

                {/* User Basic Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="px-3 py-1 mt-2 rounded-full text-md border-2 border-violet-300 font-medium bg-violet-100 text-violet-700">{user.email}</p>
                    {/* <p className="text-md text-gray-400">User ID: {user.id}</p> */}
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Phone</p>
                    <p className="text-gray-800 font-medium">{user.phone}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Address</p>
                    <p className="text-gray-800 font-medium">{user.address}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Gender</p>
                    <p className="text-gray-800 font-medium">{user.gender}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Account Status</p>
                    <span
                        className={`px-3 py-1 rounded-full text-md font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        {user.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Verified</p>
                    <span
                        className={`px-3 py-1 rounded-full text-md font-medium ${user.isVerified ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-violet-200">
                    <p className="text-gray-500 text-md">Role</p>
                    <p className="text-gray-800 font-medium">{user.role}</p>
                </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 text-right">
                <Button href={'/user/profile/edit'}>
                    Edit Profile
                </Button>
            </div>

            <Outlet />

        </div>
    );
};

export default ProfileContent;
