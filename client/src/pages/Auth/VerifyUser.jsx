import React, { useState } from "react";
import TopWave from "../../components/Auth/Topwave";
import Logo from "../../components/General/Logo";
import Otp from "../../components/Auth/Otp";
import Button from "../../components/General/Button";
import Loader from "../../components/General/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "../../utils/axios";

const VerifyUser = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const data = location.state;

  const handleVerify = async () => {
    setLoading(true);
    try {
      const otpCode = otp.join("");
      console.log(otpCode);

      if (otpCode.length !== 4) {
        toast.error("Please enter the 4-digit code.");
        setLoading(false);
        return;
      }

      const response = await axios.post("/auth/verify-user", {
        ...data,
        otp: otpCode,
      });

      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("OTP expired or invalid");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b to-[#ffffff] text-white flex flex-col items-center justify-center">
      <TopWave />
      <div className="w-92 max-w-md mx-auto min-h-[24rem] flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 z-50 transition-all duration-300">
        {/* Top Content */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="text-center flex flex-col gap-1">
            <h3 className="text-darkgray text-[15px]">Verification</h3>
            <p className="text-gray text-xs">Verify & Unlock Full Access</p>
          </div>
          <div className="mt-5">
            <Otp otp={otp} setOtp={setOtp} />
            <div className="h-[18px] w-[295px]">
              <p className="text-[#5B5B5B] text-[11px] font-albert font-semibold">
                Didn’t receive SMS?{" "}
                <span className="text-primary cursor-pointer">Resend code</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="">
          <Button
            onClick={handleVerify}
            disabled={otp.join("").length !== 4 || loading}
            className="relative text-white w-full"
          >
            {loading ? <Loader /> : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
