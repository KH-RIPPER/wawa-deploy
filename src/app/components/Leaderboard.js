import Flag from "react-world-flags";

export default function Leaderboard({ scores, loading }) {
  const sortedScores = [...scores].sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Leaderboard
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading scores...</p>
      ) : (
        <ul className="space-y-2">
          {sortedScores.map(({ country, clicks, countryCode }) => (
            <li
              key={country}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
              role="listitem"
            >
              <span className="flex items-center space-x-2">
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
      )}
    </div>
  );
}
