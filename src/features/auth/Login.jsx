import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { RoutePath } from "@routes/routes";
import { useAuth } from "@context/AuthContext";
import { toast } from "react-hot-toast";



const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()

  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          credentials: 'include'
        });

        console.log(response);

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          toast.success("Logged in successfully! 🎉", { id: "login", duration: 3000 });
          setTimeout(() => {
            navigate(`${RoutePath.USER}/${RoutePath.PROFILE}`);
          }, 3000);
        }
      } catch (err) {
        console.error(err);
      }
    }


  });

  return (
    <section id="login-section" className="max-w-[600px] mx-auto mt-5">
      <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
        Login
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

        </fieldset>
        <div className="mb-3 text-left">
          <Button
            type={"submit"}
            name={"login-btn"}
            btnText={"Login"}
          />
        </div>
      </form>
      <div className="text-center my-2">
        <span>Forgotten password?
          <Button
            btnClass={'text-indigo-600 hover:text-indigo-800 ml-2'}
            href={'/auth/forgot-password'}
            btnText={"Forgot password"}
          />
        </span>
      </div>
    </section>
  );
};

export default Login;