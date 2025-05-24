import { useEffect, useState } from "react";
import cover from "../../assets/images/bookcover2.png";
import learn from "../../assets/images/learn.png";

const Home = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        hour12: false,
      });

      const hourInt = parseInt(hour, 10);

      if (hourInt >= 5 && hourInt < 12) return "Good morning";
      if (hourInt >= 12 && hourInt < 17) return "Good afternoon";
      if (hourInt >= 17 && hourInt < 24) return "Good evening";
      return "Good morning"; // 0-4 AM
    };

    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[100%] max-w-7xl mx-auto  h-[85vh]  flex  flex-col gap-6 overflow-x-hidden px-4 py-6 hide-scrollbar">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Quote Box */}
        <div className="h-40 w-full lg:w-1/2 text-white rounded-lg p-4 bg-gradient-to-r from-[#833AB4] to-[#EB5231]">
          <div className="flex flex-col gap-3 h-full justify-center">
            <h3 className="text-lg font-semibold">Today's Quote</h3>
            <p className="text-sm">
              "There's more treasure in books than in a pirate's loot on
              Treasure Land."
            </p>
            <p className="ml-auto text-sm">- Walt Disney</p>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="flex h-40 w-full lg:w-1/2 rounded-lg border border-primary overflow-hidden">
          <div className="flex items-center justify-center h-full w-14 bg-gradient-to-r from-[#833AB4] to-[#EB5231] text-white font-semibold">
            <p className="transform -rotate-90 whitespace-nowrap">
              New Arrivals
            </p>
          </div>
          <div className="flex items-center gap-4 px-3 overflow-x-auto w-full scrollbar-hide">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0"
                >
                  <img
                    src={cover}
                    alt={`New Arrival ${i + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Greeting and Recommendations */}
      <div className="flex flex-col gap-3">
        <p className="text-lg md:text-2xl font-medium">{greeting}</p>
        <p className="font-medium text-sm text-gray-700">Recommended for You</p>

        <div className="h-62 w-full gap-4  flex items-center overflow-x-auto scrollbar-hide rounded-md snap-x snap-mandatory">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[8rem] md:min-w-[8.5rem] rounded-lg p-2 bg-white shadow-md flex-shrink-0 snap-start"
              >
                <div className="w-full h-32 mb-2">
                  <img
                    src={learn}
                    alt={`Recommendation ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="text-xs font-medium space-y-1">
                  <p className="truncate">Learn UX: Design Great</p>
                  <p className="text-gray-600">Stev Krug, 2000</p>
                  <p className="text-yellow-500">
                    4.5 <span className="text-gray-400">/5</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Greeting and Recommendations */}
      <div className="flex flex-col gap-3">
        <p className="font-medium text-sm text-gray-700">Recent Readings</p>

        <div className="h-62 w-full gap-4  flex items-center overflow-x-auto scrollbar-hide rounded-md snap-x snap-mandatory">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[8rem] md:min-w-[8.5rem] rounded-lg p-2 bg-white shadow-md flex-shrink-0 snap-start"
              >
                <div className="w-full h-32 mb-2">
                  <img
                    src={learn}
                    alt={`Recommendation ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="text-xs font-medium space-y-1">
                  <p className="truncate">Learn UX: Design Great</p>
                  <p className="text-gray-600">Stev Krug, 2000</p>
                  <p className="text-yellow-500">
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
