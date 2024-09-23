import React from "react";
import Flag from "react-world-flags";

const Leaderboard = ({ scores }) => {
  const sortedScores = scores.sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Leaderboard
      </h2>
      <ul className="space-y-2">
        {sortedScores.map(({ country, clicks, countryCode }) => (
          <li
            key={country}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <span className="flex items-center space-x-2">
              <Flag code={countryCode} className="w-6 h-6" />{" "}
              <span className="font-medium text-gray-700">{country}</span>
            </span>
            <span className="font-semibold text-blue-600">{clicks}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
