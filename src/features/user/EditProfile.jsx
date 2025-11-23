import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useAuth } from "@context/AuthContext";
import { toast } from "react-hot-toast";



const EditProfile = () => {
    const { user } = useAuth();

    const navigate = useNavigate();


    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters"),
        lastName: Yup.string().required("Last Name is required").min(3, "Last Name must be at least 3 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        address: Yup.string(),
        phone: Yup.string().matches(/^(?:\+|00)[1-9]\d{1,14}$/, "Phone number must start with + or 00 and be valid"),
        role: Yup.string().required("Please choose one option"),
        gender: Yup.string().required("Please select a value")

    });

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            address: user?.address || "",
            phone: user?.phone || "",
            role: user?.role || "",
            gender: user?.gender || ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/update/${user?.id}`;
            try {
                toast.loading("Updating profile... ⏳", { id: "profile", duration: Infinity });
                const response = await fetch(endpoint, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                    credentials: 'include'
                });

                if (!response.ok) throw new Error("Something went wrong");
                toast.success("Profile updated successfully! 🎉", { id: "profile", duration: 5000 });

                setTimeout(() => {
                    navigate('/user/profile');
                }, 2000);

            } catch (err) {
                toast.error(err.message, { id: "profile" });

            }
        }


    });

    return (
        <section id="profile-section" className="max-w-[800px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
                User Profile
            </h2>





            <form id="login-form" className="p-10" onSubmit={formik.handleSubmit}>
                <fieldset>
                   
                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"text"}
                            id="firstName"
                            name="firstName"
                            required={true}
                            label={"First Name"}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && formik.errors.firstName}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"text"}
                            id="lastName"
                            name="lastName"
                            required={true}
                            label={"Last Name"}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>


                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"email"}
                            id="email"
                            name="email"
                            required={true}
                            inputMode={"email"}
                            label={"Email"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                            disabled={true}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"text"}
                            id="address"
                            name="address"
                            required={true}
                            label={"Address"}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && formik.errors.address}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"tel"}
                            id="phone"
                            name="phone"
                            required={true}
                            label={"Phone"}
                            value={formik.values.phone}
                            inputMode={"tel"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && formik.errors.phone}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            tag="select"
                            name="gender"
                            label="Gender"
                            id="gender"
                            required={true}
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                                { value: "not specified", label: "Not specified" }
                            ]}
                            error={formik.touched.gender && formik.errors.gender}
                        />

                    </div>
                    <Input
                        type="hidden"
                        id="adminRole"
                        name="role"
                        value={user.role}

                    />

                    {/* {<div className="mb-3">
                        <div className="flex space-x-4">



                            <Input
                                type="radio"
                                id="adminRole"
                                name="role"
                                value="admin"
                                label="Admin"
                                checked={formik.values.role === "admin"}
                                onChange={formik.handleChange}
                            />
                            <Input
                                type="radio"
                                id="userRole"
                                name="role"
                                value="user"
                                label="User"
                                checked={formik.values.role === "user"}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.role && formik.errors.gender && (
                            <div className="text-red-500 text-md mt-1">{formik.errors.role}</div>
                        )}


                    </div>} */}



                </fieldset>
                <div className="mb-3 text-left">
                    <Button
                        type={"submit"}
                        name={"update-profile-btn"}
                        btnText={formik.isSubmitting ? "Updating..." : "Update profile"}
                        disabled={formik.isSubmitting ? true : false}
                    />
                </div>
            </form>
        </section>
    );
};

export default EditProfile;