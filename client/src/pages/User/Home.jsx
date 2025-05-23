import { useEffect, useState } from "react";
import cover from "../../assets/images/bookcover2.png";
import learn from "../../assets/images/learn.png";

const Home = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Lagos",
        hour: "numeric",
        hour12: false,
      });

      const hour = parseInt(now, 10);

      if (hour >= 5 && hour < 12) return "Good morning";
      if (hour >= 12 && hour < 17) return "Good afternoon";
      return "Good evening";
    };

    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-fit flex flex-col gap-5 overflow-x-hidden px-4">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Quote Box */}
        <div className="h-40 w-full lg:w-1/2 text-white rounded-lg p-4 bg-gradient-to-r from-[#833AB4] to-[#EB5231]">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Today's Quote</h3>
            <p className="text-sm">
              "There's more treasure in books than in a pirate's loot on
              Treasure Land."
            </p>
            <p className="ml-auto">- Walt Disney</p>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="flex h-40 w-full lg:w-1/2 rounded-lg border border-primary overflow-hidden">
          <div className="flex items-center justify-center h-full w-14 bg-gradient-to-r from-[#833AB4] to-[#EB5231] text-white font-semibold">
            <p className="transform -rotate-90 whitespace-nowrap">
              New Arrivals
            </p>
          </div>
          <div className="flex items-center gap-5 px-3 overflow-x-scroll w-full  scrollbar-hide">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-36 min-w-[120px] rounded-lg flex items-center"
                >
                  <img
                    src={cover}
                    alt="bookcover"
                    className="h-full w-full rounded-lg "
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Greeting and Recommendations */}
      <div className="flex flex-col gap-3">
        <p className="text-lg md:text-2xl">{greeting}</p>
        <p className="font-light text-sm">Recommended for You</p>

        <div className="h-60 w-full gap-3 border border-gray-400 flex items-center overflow-x-scroll scrollbar-hide p-3 rounded-md ">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[8.5rem] rounded-lg p-2 bg-white shadow-md flex-shrink-0 snap-start"
              >
                <div className="w-full h-30">
                  <img
                    src={learn}
                    alt="bookcover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-[11px] font-medium">
                  <p className="truncate">Learn UX: Design Great</p>
                  <p>Stev Krug, 2000</p>
                  <p>
                    4.5 <span className="text-gray-400">/5</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
