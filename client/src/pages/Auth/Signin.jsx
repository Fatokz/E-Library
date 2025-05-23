import React, { useState } from "react";
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

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = () => navigate("/onboard");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await axios.post("/auth/login", payload, {
          withCredentials: true,
        });
        if (response.data.role === "admin") {
          // localStorage.setItem("token", response.data.accessToken);
          navigate("/admin");
        } else if (response.data.role === "user") {
          // localStorage.setItem("token", response.data.accessToken);
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        toast.success("Sign In successful!");
        resetForm();
      } catch (error) {
        console.error("Error response:", error?.response?.data);
        const errorMessage =
          error?.response?.data?.message ||
          Object.values(error?.response?.data || {})?.[0]?.[0] ||
          "Login failed.";

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
            <h3 className="text-darkgray text-[15px]">Welcome Back!</h3>
            <p className="text-gray text-xs">
              Sign in to continue to your Digital Library
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="w-full overflow-hidden">
          <div className="max-h-[400px] flex flex-col gap-6 overflow-y-auto hide-scrollbar">
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

            <div className="text-black text-[12px] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-checkbox text-primary  focus:ring-primary"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </div>

                {/* Forgot password link */}
                <a href="#" className="text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div className="h-fit w-full  mt-40 flex flex-col gap-3 ">
            <Button
              type="submit"
              //   disabled={
              //     loading ||
              //     !formik.isValid ||
              //     !formik.dirty ||
              //     formik.isSubmitting
              //   }
              className="relative text-white w-full"
            >
              {loading ? <Loader /> : "Login"}
            </Button>

            <div className="z-50 text-center text-black text-[12px] ">
              <p>
                New User?{" "}
                <span
                  className="cursor-pointer text-primary font-medium"
                  onClick={handleSignup}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
