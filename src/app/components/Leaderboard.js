import React from "react";
import Flag from "react-world-flags";
import countriesList from "@/data/countriesList"; // Adjust the path if necessary

const MedalIcon = ({ rank }) => {
  switch (rank) {
    case 1:
      return <span className="text-2xl mr-2">🥇</span>;
    case 2:
      return <span className="text-2xl mr-2">🥈</span>;
    case 3:
      return <span className="text-2xl mr-2">🥉</span>;
    default:
      return null;
  }
};

export default function Leaderboard({ scores, loading }) {
  const scoresMap = new Map(
    scores.map(({ country, clicks, countryCode }) => [
      countryCode,
      { country, clicks, countryCode },
    ])
  );

  const combinedScores = countriesList.map(({ country, countryCode }) => ({
    country,
    countryCode,
    clicks: scoresMap.get(countryCode)?.clicks || 0,
  }));

  const sortedScores = [...combinedScores].sort((a, b) => b.clicks - a.clicks);

  const totalWorldwideClicks = sortedScores.reduce(
    (total, score) => total + score.clicks,
    0
  );

  return (
    <div className="w-full rounded-lg p-2">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Leaderboard
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading scores...</p>
      ) : (
        <div className="max-h-[350px] overflow-y-auto">
          <ul className="space-y-2">
            {/* Worldwide total section */}
            <li className="flex justify-between items-center bg-blue-100 p-4 rounded-md shadow-sm mb-4">
              <span className="flex items-center space-x-2">
                <span className="w-8 text-center">🌍</span>
                <span className="font-medium text-gray-700">Worldwide</span>
              </span>
              <span className="font-semibold text-blue-600">
                {totalWorldwideClicks}
              </span>
            </li>

            {/* Country-specific rankings */}
            {sortedScores.map(({ country, clicks, countryCode }, index) => (
              <li
                key={countryCode}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
                role="listitem"
              >
                <span className="flex items-center space-x-2">
                  {index < 3 ? (
                    <MedalIcon rank={index + 1} />
                  ) : (
                    <span className="w-8 text-center font-semibold text-gray-500">
                      {index + 1}
                    </span>
                  )}
                  <Flag
                    code={countryCode}
                    className="w-6 h-6"
                    alt={`${country} flag`}
                  />
                  <span className="font-medium text-gray-700">{country}</span>
                </span>
                <span className="font-semibold text-blue-600">{clicks}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
