import TopWave from "../../components/Auth/Topwave";
import Logo from "../../components/General/Logo";
import Inputfield from "../../components/Auth/Inputfield";
import Button from "../../components/General/Button";

const Register = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b to-[#ffffff] text-white flex flex-col gap-5 items-center justify-center">
      <TopWave />
      <form className="w-92 max-w-md mx-auto h-auto min-h-[32rem] flex flex-col gap-3 bg-white rounded-2xl shadow-xl p-8 z-50 transition-all duration-300">
        <div className="flex w-full flex-col gap-1 ">
          <div className="flex justify-center">
            <Logo />
          </div>
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
            />
            <Inputfield
              title="Reg / Matric No."
              placeholder="09934"
              type="text"
              name="matricNumber"
            />
            <Inputfield
              title="Email"
              placeholder="user@gmail.com"
              type="email"
              name="email"
            />
            <Inputfield
              title="Password"
              placeholder="******"
              type="password"
              name="password"
            />
            <Inputfield
              title="Confirm Password"
              placeholder="******"
              type="password"
              name="confirmPassword"
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <Button type="submit">Register</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
