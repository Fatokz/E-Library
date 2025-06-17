import { useState } from "react";
import TopWave from "../../components/Auth/Topwave";
import Logo from "../../components/General/Logo";
import Inputfield from "../../components/Auth/Inputfield";
import Button from "../../components/General/Button";
import Loader from "../../components/General/Loader";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { toast } from "sonner";

const Onboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => navigate("/signin");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      try {
        const response = await axios.post("auth/user-register", payload);
        console.log("Register response:", response.data);

        // Save name to localStorage for later use
        localStorage.setItem("userName", values.name);

        toast.success("OTP sent successfully!");
        resetForm();
        navigate("/verify", { state: values });
      } catch (error) {
        console.error("Error response:", error?.response?.data);

        const errorMessage =
          error?.response?.data?.message ||
          Object.values(error?.response?.data || {})?.[0]?.[0] ||
          "Registration failed.";

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b to-[#ffffff] text-white flex flex-col gap-5 items-center justify-center">
      <TopWave />
      <div className="w-92 max-w-md mx-auto h-auto min-h-[32rem] flex flex-col gap-7 bg-white rounded-2xl shadow-xl p-8 z-50 transition-all duration-300">
        <div className="flex w-full flex-col gap-1 ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="text-center flex flex-col gap-1">
            <h3 className="text-darkgray text-[15px]">Register</h3>
            <p className="text-gray text-xs">For Both Staff & Students</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="w-full overflow-hidden">
          <div className="h-fit  flex flex-col gap-6 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col w-full gap-1">
              <Inputfield
                title="Name"
                placeholder="Ambassador"
                type="name"
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-[10px]">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Inputfield
                title="Email"
                placeholder="user@gmail.com"
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-[10px]">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Inputfield
                title="Password"
                placeholder="******"
                type="password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-[10px]">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="flex flex-col w-full gap-1">
              <Inputfield
                title="Confirm Password"
                placeholder="******"
                type="password"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-600 text-[10px]">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>

          <div className="h-fit w-full  mt-10 flex flex-col gap-3 ">
            <Button
              type="submit"
              disabled={
                loading ||
                !formik.isValid ||
                !formik.dirty ||
                formik.isSubmitting
              }
              className="relative text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader /> : "Register"}
            </Button>

            <div className="z-50 text-center text-black text-[12px]">
              <p>
                Already a User?{" "}
                <span
                  className="cursor-pointer text-primary font-medium"
                  onClick={handleLogin}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboard;
