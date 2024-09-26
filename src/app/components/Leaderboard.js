"use client";

import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import clickService from "@/services/click";
import { FaSpinner } from "react-icons/fa";

const MedalIcon = ({ rank }) => {
  switch (rank) {
    case 1:
      return (
        <span role="img" aria-label="Gold Medal" className="text-yellow-500">
          🥇
        </span>
      );
    case 2:
      return (
        <span role="img" aria-label="Silver Medal" className="text-gray-400">
          🥈
        </span>
      );
    case 3:
      return (
        <span role="img" aria-label="Bronze Medal" className="text-orange-500">
          🥉
        </span>
      );
    default:
      return <span className="text-gray-600">{rank}</span>;
  }
};

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalWorldwideClicks, setTotalWorldwideClicks] = useState(0);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const result = await clickService.getLeaderboard();
      console.log(result);
      setLeaderboard(result);
      calculateTotalClicks(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  const calculateTotalClicks = (scores) => {
    const totalClicks = scores.reduce(
      (total, score) => total + score.totalClicks,
      0
    );
    setTotalWorldwideClicks(totalClicks);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const onUpdate = (newLeaderboard) => {
      console.log("newLeaderboard", newLeaderboard);
      setLeaderboard(newLeaderboard);
      calculateTotalClicks(newLeaderboard);
    };

    clickService.setupSocketIO(onUpdate);

    return () => {
      clickService.cleanupSocketIO();
    };
  }, [clickService]);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        🌍 Global Click Leaderboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
          <p className="ml-2 text-lg font-medium">Loading scores...</p>
        </div>
      ) : (
        <>
          <div className="worldwide-total text-center mb-6 text-lg font-semibold">
            <span role="img" aria-label="Worldwide">
              🌍
            </span>{" "}
            Worldwide Clicks:{" "}
            <span className="text-indigo-600">{totalWorldwideClicks}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-400 text-white">
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(
                  ({ _id: countryCode, country, totalClicks }, index) => (
                    <tr
                      key={countryCode}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-indigo-100 transition-all`}
                    >
                      <td className="py-3 px-4">
                        <MedalIcon rank={index + 1} />
                      </td>
                      <td className="py-3 px-4 flex items-center">
                        <Flag
                          code={countryCode}
                          className="w-6 h-4 mr-2"
                          alt={`${country} Flag`}
                        />
                        {country}
                      </td>
                      <td className="py-3 px-4">{totalClicks}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
