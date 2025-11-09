import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router";
import { RoutePath } from "@routes/routes";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";


const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.response?.userEmail;
    const initialMessage = location.state?.response?.message;
    const [responseMessage, setResponseMessage] = useState(initialMessage || "");

    useEffect(() => {
        if (responseMessage) {
            toast(responseMessage, {
                id: "resetPassword",
                duration: 7000,
                style: {
                    background: "#17a2b8",
                    color: "#fff",
                },
            });
        }
    }, []);

    console.log(userEmail);


    const validationSchema = Yup.object({
        otp: Yup.string()
            .matches(/^\d+$/, "OTP must contain only numbers")
            .length(6, "OTP must be 6 digits")
            .required("OTP is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),

    });


    const formik = useFormik({
        initialValues: {
            email: userEmail || "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}${RoutePath.AUTH}/${RoutePath.RESET_PASSWORD}`;
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!response.ok) throw new Error("Something went wrong");

                const data = await response.json();
                

                if (response.ok) {
                    setResponseMessage(data.message);
                    toast.success(responseMessage, { id: "resetPassword" });
                    setTimeout(() => {
                        navigate(`${RoutePath.AUTH}/${RoutePath.LOGIN}`);
                    }, 3000);
                }
            } catch (err) {
                console.error(err);
            }
        }


    });

    return (
        <section id="reset-password-section" className="max-w-[600px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
                Reset Password
            </h2>
            {responseMessage && <div className="text-center mb-4">{responseMessage}</div>}
            <form id="reset-password-form" className="p-10" onSubmit={formik.handleSubmit}>
                <fieldset>
                    <div className="mb-3">
                        <Input
                            tag="input"
                            type="text"
                            id="otp"
                            name="otp"
                            required
                            label="OTP"
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.otp && formik.errors.otp}
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
                            type={"password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            required={true}
                            label={"confirm password"}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </div>

                </fieldset>
                <div className="mb-3 text-left">
                    <Button
                        type={"submit"}
                        name={"reset-password-btn"}
                        btnText={formik.isSubmitting ? "Submitting..." : "Submit"}
                        disabled={formik.isSubmitting ? true : false}
                    />
                </div>
            </form>
        </section>
    );
};

export default ResetPassword;