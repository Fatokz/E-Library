import React, { useState } from "react";
import TopWave from "../../components/Auth/Topwave";
import Logo from "../../components/General/Logo";
import Otp from "../../components/Auth/Otp";
// import Inputfield from "../../components/Auth/Inputfield";
import Button from "../../components/General/Button";
import Loader from "../../components/General/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyUser = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  console.log(location.state);
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
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Something went wrong during verification.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b to-[#ffffff] text-white flex flex-col gap-5 items-center justify-center">
      <TopWave />
      <div className="w-92 max-w-md mx-auto h-auto min-h-[32rem] flex flex-col gap-3 bg-white rounded-2xl shadow-xl p-8 z-50 transition-all duration-300">
        <div className="flex w-full flex-col gap-1 ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="text-center flex flex-col gap-1">
            <h3 className="text-darkgray text-[15px]">Verification</h3>
            <p className="text-gray text-xs">Verify your Profile</p>
          </div>
        </div>

        {/* Form */}
        {/* <Otp /> */}
        <div className="mt-5">
          <Otp otp={otp} setOtp={setOtp} />
          <div className="h-[18px]  w-[295px]">
            <p className="text-[#5B5B5B] text-xs font-albert font-semibold">
              Didn’t receive SMS?{" "}
              <span className="text-lemon">Resend code</span>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 items-center h-60 w-full">
          <Button
            onClick={handleVerify}
            disabled={otp.join("").length !== 4 || loading}
            className="w-full"
          >
            {loading ? <Loader /> : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
