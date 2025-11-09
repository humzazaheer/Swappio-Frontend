import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { RoutePath } from "@routes/routes";
import { toast } from "react-hot-toast";



const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.response?.user;
  const initialMessage = location.state?.response?.mesage;
  const [responseMessage, setResponseMessage] = useState(initialMessage || "");

   useEffect(() => {
    if (responseMessage) {
      toast(responseMessage, {
        id: "verify",
        duration: 7000,
        style: {
          background: "#17a2b8",
          color: "#fff",
        },
      });
    }
  }, [responseMessage]);


  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d+$/, "OTP must contain only numbers")
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
      email: user?.email || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/verify-account`;
        toast.loading("Verifying your account... ⏳", { id: "verify", duration: Infinity });
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          setResponseMessage(data.message);
          toast.success(responseMessage, { id: "verify" });
          setTimeout(() => {
            navigate(`${RoutePath.AUTH}/${RoutePath.LOGIN}`);
          }, 3000);
        }

      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <section id="register-section" className="max-w-[600px] mx-auto mt-5">
      <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
        Verify Account
      </h2>

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

export default VerifyAccount;
