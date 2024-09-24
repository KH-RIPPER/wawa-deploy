"use client";
import ClickButton from "./components/ClickButton";
import Leaderboard from "./components/Leaderboard";
import { useClick } from "@/contexts/click";
import debounce from "lodash.debounce";
import { useState, useMemo, useEffect } from "react";
import Flag from "react-world-flags";
import countriesList from "@/data/countriesList"; // Adjust the path if necessary

export default function Home() {
  const { clicks, scoreboard, addClick, userCountry } = useClick();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [localClicks, setLocalClicks] = useState(0);

  const debouncedAddClick = debounce(() => {
    addClick();
    setLocalClicks((prev) => prev + 1);
  }, 100);

  useEffect(() => {
    setLocalClicks(clicks);
  }, [clicks]);

  const {
    userRank,
    topCountry,
    topCountryClicks,
    userClicks,
    sortedScores,
    totalWorldwideClicks,
    topCountryName,
  } = useMemo(() => {
    const scoresMap = new Map(
      scoreboard.map(({ country, clicks, countryCode }) => [
        countryCode,
        { country, clicks, countryCode },
      ])
    );

    const combinedScores = countriesList.map(({ country, countryCode }) => ({
      country,
      countryCode,
      clicks: scoresMap.get(countryCode)?.clicks || 0,
    }));

    const sortedScores = [...combinedScores].sort(
      (a, b) => b.clicks - a.clicks
    );
    const userRank =
      sortedScores.findIndex((score) => score.countryCode === userCountry) + 1;
    const topCountry = sortedScores[0]?.countryCode || "";
    const topCountryName = sortedScores[0]?.country || "";
    const topCountryClicks = sortedScores[0]?.clicks || 0;
    const userClicks =
      sortedScores.find((score) => score.countryCode === userCountry)?.clicks ||
      0;
    const totalWorldwideClicks = sortedScores.reduce(
      (total, score) => total + score.clicks,
      0
    );

    return {
      userRank,
      topCountry,
      topCountryClicks,
      userClicks,
      sortedScores,
      totalWorldwideClicks,
      topCountryName,
    };
  }, [scoreboard, userCountry]);

  const toggleLeaderboard = () => {
    setIsLeaderboardOpen(!isLeaderboardOpen);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Click the Cat!</h1>
        <ClickButton onClick={debouncedAddClick} />
        <h2 className="text-xl mt-4">Total Clicks: {localClicks}</h2>
      </div>

      <div
        className={`fixed w-[500px] bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 shadow-xl rounded-t-lg transition-all duration-300 ease-in-out ${
          isLeaderboardOpen ? "h-1/2" : "h-16"
        } flex flex-col items-center overflow-hidden`}
      >
        <button
          onClick={toggleLeaderboard}
          className="w-full h-16 text-gray-800 text-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-between px-4"
        >
          {isLeaderboardOpen ? (
            "Hide Leaderboard"
          ) : (
            <>
              <div className="flex items-center">
                <Flag code={topCountry} className="w-6 h-6 mr-2" />
                <span className="mr-2 font-normal">
                  #1 {topCountryName} {topCountryClicks}
                </span>
              </div>
              <div className="flex items-center">
                {/* Display user's country flag */}
                {userCountry && <Flag code={userCountry} className="w-6 h-6" />}
              </div>
            </>
          )}
        </button>
        <div
          className={`w-full overflow-auto transition-all duration-300 ease-in-out ${
            isLeaderboardOpen ? "flex-grow" : "h-0"
          }`}
        >
          <Leaderboard
            scores={sortedScores}
            totalWorldwideClicks={totalWorldwideClicks}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
