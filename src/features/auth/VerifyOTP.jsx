import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { RoutePath } from "@routes/routes";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state?.response?.userEmail;
  const initialMessage = location.state?.response?.message;
  const [responseMessage, setResponseMessage] = useState(initialMessage || "");


  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d+$/, "OTP must contain only numbers")
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
      email: userEmail || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setResponseMessage(data.message);
        navigate(`${RoutePath.AUTH}/${RoutePath.RESET_PASSWORD}`, {
            state: {response: data}
        });
      } catch (error) {
        console.error("Verification error:", error);
      }
    },
  });

  return (
    <section id="otp-section" className="max-w-[600px] mx-auto mt-5">
      <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
        Verify OTP
      </h2>
      {responseMessage && <div className="text-center mb-4">{responseMessage}</div>}
      <form id="verify-account-form" className="p-10" onSubmit={formik.handleSubmit}>
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
        </fieldset>
        <div className="mb-3 text-left">
          <Button
            type="submit"
            name="verify-btn"
            btnText={formik.isSubmitting ? "Verifying..." : "Verify"}
            disabled={formik.isSubmitting}
          />
        </div>
      </form>
    </section>
  );
};

export default VerifyOTP;
