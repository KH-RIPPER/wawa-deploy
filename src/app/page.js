"use client";
import Leaderboard from "./components/Leaderboard";
import { useState, useMemo, useEffect } from "react";
import { useClick } from "@/contexts/click";
import debounce from "lodash.debounce";
import Flag from "react-world-flags";
import Navbar from "./components/Navbar";

import { motion } from "framer-motion";
import Image from "next/image";
import WawaCat from "@/assets/wawa-cat.png";
import WawaCry from "@/assets/wawa-cry.png";
import GhostBl from "@/assets/ghostbl.png";
import GhostBr from "@/assets/ghostbr.png";
import GhostTr from "@/assets/ghosttr.png";
import GhostTc from "@/assets/ghosttc.png";
import GhostTl from "@/assets/ghosttl.png";

const floatAnimation = {
  y: [0, -30, 30, 0],
  x: [0, 20, -20, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
};

export default function Home() {
  const { clicks, scoreboard, addClick, userCountry } = useClick();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [localClicks, setLocalClicks] = useState(clicks);
  const [stats, setStats] = useState({});
  const [showWawaCry, setShowWawaCry] = useState(false);

  useEffect(() => {
    if (scoreboard.length > 0) {
      const topCountryData = scoreboard.reduce((prev, curr) =>
        prev.totalClicks > curr.totalClicks ? prev : curr
      );
      const userCountryData = scoreboard.find(
        (country) => country.isUsersCountry
      );
      if (topCountryData && userCountryData) {
        setStats({
          topCountry: topCountryData?.country || "",
          topCountryName: topCountryData?.country || "",
          topCountryClicks: topCountryData?.totalClicks || "",
          userCountryClicks: userCountryData?.totalClicks || "",
          userCountryName: userCountryData?.country || "",
        });
      }
    }
  }, [scoreboard]);

  const debouncedAddClick = useMemo(
    () =>
      debounce(() => {
        addClick();
        setLocalClicks((prev) => prev + 1);

        setShowWawaCry(true);

        setTimeout(() => {
          setShowWawaCry(false);
        }, 300);
      }, 100),
    [addClick]
  );

  useEffect(() => {
    setLocalClicks(clicks);
  }, [clicks]);

  const toggleLeaderboard = () => setIsLeaderboardOpen((prev) => !prev);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full relative">
      <div className="w-full h-screen bg-[url('../assets/background.png')] bg-cover bg-center relative z-0">
        <div className="absolute scale-[0.7] md:scale-[1] top-2 left-1/2 transform -translate-x-1/2 z-50 w-[550px] p-4">
          <Navbar />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center relative z-40">
          <button
            onClick={debouncedAddClick}
            className="absolute inset-0 opacity-0 z-30 cursor-pointer w-full h-[100vh]"
            aria-label="Click Button"
          ></button>

          <h2 className="text-lg sm:text-xl font-bold mt-24 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg px-4 py-2 rounded-full">
            Total Clicks: {localClicks}
          </h2>
        </div>

        <Image
          src={WawaCat}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[400px]  md:w-[800px] lg:w-[1000px] xl:w-[1100px]"
        />

        {showWawaCry && (
          <Image
            src={WawaCry}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20 w-[400px]  md:w-[800px] lg:w-[1000px] xl:w-[1100px]"
          />
        )}

        <motion.div
          className="absolute bottom-10 left-5 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
          animate={floatAnimation}
        >
          <Image src={GhostBl} alt="Ghost Bottom Left" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-16 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
          animate={floatAnimation}
        >
          <Image src={GhostBr} alt="Ghost Bottom Right" />
        </motion.div>
        <motion.div
          className="absolute top-10 left-5 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
          animate={floatAnimation}
        >
          <Image src={GhostTl} alt="Ghost Top Left" />
        </motion.div>
        <motion.div
          className="absolute top-10 right-16 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
          animate={floatAnimation}
        >
          <Image src={GhostTr} alt="Ghost Top Right" />
        </motion.div>
        <motion.div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
          animate={floatAnimation}
        >
          <Image src={GhostTc} alt="Ghost Top Center" />
        </motion.div>

        <div
          className={`fixed w-full max-w-[90%] sm:max-w-[500px] bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 shadow-xl rounded-t-lg transition-all duration-300 ease-in-out ${
            isLeaderboardOpen ? "h-1/2" : "h-16"
          } flex flex-col items-center overflow-hidden z-50`}
        >
          <button
            onClick={toggleLeaderboard}
            className="w-full h-16 text-gray-800 text-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-between px-4"
          >
            <div className="flex items-center space-x-2">
              <Flag code={stats?.topCountry} className="w-6 h-6" />
              <span className="font-bold">#1</span>
              <span>{stats?.topCountryName}</span>
              <span>({stats?.topCountryClicks})</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag code={stats?.userCountryName} className="w-6 h-6" />
              <span>{stats?.userCountryName}</span>
              <span>({stats?.userCountryClicks})</span>
            </div>
            <div
              className={`transform transition-transform duration-300 ${
                isLeaderboardOpen ? "rotate-180" : ""
              }`}
            >
              ▲
            </div>
          </button>

          <div
            className={`w-full overflow-auto transition-all duration-300 ease-in-out ${
              isLeaderboardOpen ? "flex-grow" : "h-0"
            }`}
          >
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
