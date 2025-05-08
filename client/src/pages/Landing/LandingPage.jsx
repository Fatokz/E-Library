import { useEffect, useState } from "react";
import logo from "../../assets/images/Logo.svg";
import { Menu } from "lucide-react";
import lms from "../../assets/images/dashboard.svg";
import library from "../../assets/images/library.png";
import Card from "../../components/Landing/Card";
import modern from "../../assets/images/modern.jpg";

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav
        className={`fixed top-0 z-50 w-full flex items-center justify-between 
    px-6 md:px-10 lg:px-30 transition-all duration-300 
    backdrop-blur-md
    ${scrolled ? "bg-white/70 py-2 shadow-xs" : "bg-silver py-4"}`}
      >
        <div className="h-fit w-35 flex gap-1 items-center ">
          <img src={logo} alt="BookSync Logo" className="md:size-10 size-8" />
          <p className="font-inter text-[12px] md:text-[14px] font-medium">
            BookSync
          </p>
        </div>
        <div className="hidden md:block h-fit w-fit">
          <ul className="flex text-[14px] font-light gap-10 font-inter">
            <li>Home</li>
            <li>Feature</li>
            <li>Testimonial</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="h-fit w-fit md:flex gap-4 hidden">
          <button className="p-1 text-primary text-[13px] cursor-pointer">
            Login
          </button>
          <button className="w-[70px] font-light text-[12px] px-3 bg-primary text-white py-1 rounded-[5px] cursor-pointer">
            Sign up
          </button>
        </div>
        <div className="cursor-pointer block md:hidden text-primary">
          <Menu />
        </div>
      </nav>

      {/* Section 1 */}
      <section className="md:h-[90vh] h-fit md:flex md:items-center md:justify-center w-full bg-silver px-10 md:px-10 lg:px-30">
        <div className="h-96 w-full flex items-center md:flex md:items-center md:gap-5">
          <div className="md:w-2/3 flex flex-col gap-6  md:flex md:flex-col md:gap-3">
            <h1 className="font-inter font-medium text-darkgray  md:text-6xl text-4xl">
              Effortless Library Management for{" "}
              <span className="text-primary">All Institutions</span>
            </h1>
            <p className="text-[12px] text-gray-500 font-medium">
              Track books, manage members, and automate borrowing in one
              seamless platform.
            </p>
            <button className="w-[70px] text-[12px] px-3 bg-primary text-white py-2 font-light rounded-[5px] cursor-pointer">
              Register
            </button>
          </div>
          <div className="md:h-80 md:w-2/3 hidden md:block">
            <img src={lms} alt="dashboard" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-fit md:h-[30vh] flex flex-col gap-3 py-5 px-10 md:px-10 lg:px-30">
        <div className="text-center">
          <h2 className="font-inter font-medium text-darkgray md:text-3xl text-2xl">
            Serving the Global Library Community
          </h2>
          <p className="text-[12px] text-gray-500 md:text-[14px]">
            Educational institutions, public libraries, and private centers all
            rely on us to manage their collections.
          </p>
        </div>
        <div className="h-18 w-full flex gap-4 md:gap-10 justify-center items-center">
          <img src={library} alt="" />
          <img src={library} alt="" />
          <img src={library} alt="" />
          <img src={library} alt="" />
        </div>
      </section>

      {/* Section 3 */}
      <section className="h-fit md:h-[75vh] bg-silver py-5 px-10 md:px-10 lg:px-30">
        <div className="flex flex-col gap-10 justify-center">
          <div>
            <div className="flex flex-col gap-2 text-center items-center">
              <h2 className="md:w-[27rem] w-[20rem] font-inter font-medium text-darkgray md:text-3xl text-2xl">
                Manage Your Entire Library in One Seamless Platform
              </h2>
              <p className="text-[12px] text-gray-500 md:text-[14px]">
                Who is this system designed for?
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
            <Card
              title="Public Libraries"
              text="Organize your entire catalog, automate returns, and engage your community with ease."
            />
            <Card
              title="Schools & Universities"
              text="Streamline student access to resources, track borrowing, and manage digital and physical collections."
            />
            <Card
              title="Private Institutions & Learning Centers"
              text="Efficiently manage books, members, and reports in one intuitive system tailored for small teams."
            />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="min-h-[60vh] w-full px-6 md:px-10 lg:px-30 py-8 flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-6xl w-full">
          {/* Image Container */}
          <div className="w-full md:w-1/3 h-60 flex items-center justify-center">
            <img
              src={modern}
              alt="Modern Library"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Container */}
          <div className="w-full md:w-2/3 h-60 flex flex-col justify-center gap-4 py-4 ">
            <h2 className="text-2xl font-inter text-darkgray font-medium">
              Three Years of Supporting Modern Libraries
            </h2>
            <p className="text-sm text-[13px] text-gray-700">
              From local schools to national institutions, our journey has been
              shaped by real-world challenges and librarian feedback.
            </p>
            <button className="w-fit px-4 py-2 bg-primary cursor-pointer text-white text-sm rounded-[5px] font-light">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="min-h-[50vh] w-full flex items-center justify-center bg-silver px-6 md:px-10 lg:px-30">
        <div className="flex gap-5">
          <div className="h-60 w-full bg-amber-700">
            <div className="md:w-full p-5">
              <h3 className="text-[20px] font-inter text-darkgray font-medium">
                Empowering Libraries Through Smart Management
              </h3>
              <p className="text-sm text-[13px] text-gray-700">
                Built with care and precision to support librarians, students,
                and communities
              </p>
            </div>
          </div>
          <div className="h-60 w-full bg-amber-700"></div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
