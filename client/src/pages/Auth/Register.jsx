import React, { useState } from "react";
import TopWave from "../../components/Auth/Topwave";
import Logo from "../../components/General/Logo";
import Inputfield from "../../components/Auth/Inputfield";
import Button from "../../components/General/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    matricNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "https://us-central1-e-library-3454c.cloudfunctions.net/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("Your account has been successfully created.");
        setFormData({
          username: "",
          matricNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError("Network error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b to-[#ffffff] text-white flex flex-col gap-5 items-center justify-center">
      <TopWave />
      <form
        onSubmit={handleSubmit}
        className="w-92 max-w-md mx-auto h-auto min-h-[32rem] flex flex-col gap-3 bg-white rounded-2xl shadow-xl p-8 z-50 transition-all duration-300"
      >
        <div className="flex flex-col gap-1 justify-center items-center">
          <Logo />
          <div className="text-center flex flex-col gap-1">
            <h3 className="text-darkgray text-[15px]">Registration</h3>
            <p className="text-gray text-xs">For Both Staff & Students</p>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div className="max-h-[400px]  flex flex-col gap-3 overflow-y-auto hide-scrollbar ">
            <Inputfield
              title="Username"
              placeholder="User"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Inputfield
              title="Reg / Matric No."
              placeholder="09934"
              type="text"
              name="matricNumber"
              value={formData.matricNumber}
              onChange={handleChange}
            />
            <Inputfield
              title="Email"
              placeholder="user@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Inputfield
              title="Password"
              placeholder="******"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Inputfield
              title="Confirm Password"
              placeholder="******"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          <div className="flex flex-col gap-3 mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
            <div className="text-black text-xs text-center">
              <p>
                Already a User?{" "}
                <span className="text-primary cursor-pointer">Login</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
