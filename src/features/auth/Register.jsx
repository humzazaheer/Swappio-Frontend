import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { RoutePath } from "@routes/routes";
import { toast } from "react-hot-toast";



const Register = () => {
    const navigate = useNavigate();


    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters"),
        lastName: Yup.string().required("Last Name is required").min(3, "Last Name must be at least 3 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        address: Yup.string(),
        phone: Yup.string().matches(/^(?:\+|00)[1-9]\d{1,14}$/, "Phone number must start with + or 00 and be valid"),
        role: Yup.string().required("Please choose one option"),
        gender: Yup.string().required("Please select a value")

    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            phone: "",
            role: "user",
            gender: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/create`;
            try {
                toast.loading("Creating your account... ⏳", { id: "register", duration: Infinity });
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (!response.ok) throw new Error("Something went wrong");

                const data = await response.json();
                toast.success("Account created successfully! 🎉", { id: "register", duration: 5000});
                navigate(`${RoutePath.AUTH}/${RoutePath.VERIFY_ACCOUNT}`, {
                    state: { response: data },
                });
            } catch (err) {
                toast.error(err.message, { id: "register" });
                
            }
        }


    });

    return (
        <section id="register-section" className="max-w-[600px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
                Register
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
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            tag={"input"}
                            type={"password"}
                            id="password"
                            name="password"
                            required={true}
                            label={"password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password}
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

                    <div className="mb-3 hidden">
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
                        {formik.touched.role && formik.errors.role && (
                            <div className="text-red-500 text-md mt-1">{formik.errors.role}</div>
                        )}


                    </div>



                </fieldset>
                <div className="mb-3 text-left">
                    <Button
                        type={"submit"}
                        name={"register-btn"}
                        btnText={formik.isSubmitting ? "Submitting..." : "Register"}
                        disabled={formik.isSubmitting ? true : false}
                    />
                </div>
            </form>
            <div className="text-center my-2">
                <span>Already have an account?
                    <Button
                        btnClass={'text-indigo-600 hover:text-indigo-800 ml-2'}
                        href={'/auth/login'}
                        btnText={"Login"}
                    />
                </span>
            </div>
        </section>
    );
};

export default Register;