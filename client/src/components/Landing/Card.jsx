import rec from "../../assets/images/Rectangle.svg";

const Card = ({ title, text, number }) => {
  return (
    <>
      <div className="w-full max-w-sm p-5 flex flex-col gap-2 items-center justify-center text-center bg-white shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] rounded-lg mx-auto">
        <div>
          <img src={rec} alt="" className="w-10 h-10 relative" />
          <p className="absolute -mt-7 font-sansation font-bold text-white text-2xl">
            {number}
          </p>
        </div>
        <p className="font-inter text-lg font-bold text-darkgray">{title}</p>
        <p className="text-gray-500 text-sm font-inter">{text}</p>
      </div>
    </>
  );
};

export default Card;
