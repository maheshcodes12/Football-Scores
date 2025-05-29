import React from 'react';
import { formatTimestamp } from '../utils/api';
import { Trophy } from 'lucide-react';

const ScoreCard = ({ match }) => {
  const isHomeWinner = match.homeGoals > match.awayGoals;
  const isAwayWinner = match.awayGoals > match.homeGoals;

  const getStatusBadge = () => {
    switch (match.status) {
      case 'LIVE':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-full animate-pulse">
            LIVE
          </span>
        );
      case 'HT':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-orange-500 text-white rounded-full">
            HT
          </span>
        );
      case 'FT':
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-green-600 text-white rounded-full">
            FT
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold bg-gray-500 text-white rounded-full">
            {match.status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 rounded-md px-2 py-1 text-xs font-medium text-indigo-800 dark:text-indigo-200">
              {match.league}
            </div>
            <div className="ml-2 text-xs text-gray-600 dark:text-gray-400">
              {match.round}
            </div>
          </div>
          <div className="flex items-center">
            {getStatusBadge()}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-7 items-center">
          <div className="col-span-3 text-right">
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-end">
              {isHomeWinner && <Trophy size={16} className="text-yellow-500 mr-1" />}
              <span className={isHomeWinner ? "font-bold" : ""}>
                {match.homeTeam}
              </span>
            </div>
          </div>
          
          <div className="col-span-1 mx-2">
            <div className="flex justify-center items-center font-bold">
              <span className={`px-2 py-1 rounded-l-md ${isHomeWinner ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>
                {match.homeGoals}
              </span>
              <span className="px-1 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                -
              </span>
              <span className={`px-2 py-1 rounded-r-md ${isAwayWinner ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>
                {match.awayGoals}
              </span>
            </div>
          </div>
          
          <div className="col-span-3 text-left">
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <span className={isAwayWinner ? "font-bold" : ""}>
                {match.awayTeam}
              </span>
              {isAwayWinner && <Trophy size={16} className="text-yellow-500 ml-1" />}
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
          {match.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;