"use client";

import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import clickService from "@/services/click"; // Ensure the path is correct

const MedalIcon = ({ rank }) => {
  switch (rank) {
    case 1:
      return (
        <span role="img" aria-label="Gold Medal">
          🥇
        </span>
      );
    case 2:
      return (
        <span role="img" aria-label="Silver Medal">
          🥈
        </span>
      );
    case 3:
      return (
        <span role="img" aria-label="Bronze Medal">
          🥉
        </span>
      );
    default:
      return null;
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
    <div>
      <h1>Leaderboard</h1>
      {loading ? (
        <p>Loading scores...</p>
      ) : (
        <>
          <div className="worldwide-total">
            <span role="img" aria-label="Worldwide">
              🌍
            </span>{" "}
            Worldwide Clicks: {totalWorldwideClicks}
          </div>

          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(
                ({ _id: countryCode, country, totalClicks }, index) => (
                  <tr key={countryCode}>
                    <td>
                      {index < 3 ? <MedalIcon rank={index + 1} /> : index + 1}
                    </td>
                    <td>
                      <Flag
                        code={countryCode}
                        style={{ width: "24px", marginRight: "8px" }}
                      />
                      {country}
                    </td>

                    <td>{totalClicks} </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
