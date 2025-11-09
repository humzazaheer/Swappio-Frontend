import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { RoutePath } from "@routes/routes";

const ForgotPassword = () => {
    const navigate = useNavigate();


    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

    });

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}${RoutePath.AUTH}/${RoutePath.FORGOT_PASSWORD}`;
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (!response.ok) throw new Error("Something went wrong");

                const data = await response.json();
                console.log("forgot response:", data);

                navigate(`${RoutePath.AUTH}/${RoutePath.RESET_PASSWORD}`, {
                    state: { response: data }
                });
            } catch (err) {
                console.error(err);
            }
        }


    });

    return (
        <section id="forgot-password-section" className="max-w-[600px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
                Forgot Password
            </h2>
            <form id="login-form" className="p-10" onSubmit={formik.handleSubmit}>
                <fieldset>

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

                </fieldset>
                <div className="mb-3 text-left">
                    <Button
                        type={"submit"}
                        name={"forgot-password-btn"}
                        btnText={formik.isSubmitting ? "Submitting..." : "Submit"}
                        disabled={formik.isSubmitting ? true : false}
                    />
                </div>
            </form>
        </section>
    );
};

export default ForgotPassword;