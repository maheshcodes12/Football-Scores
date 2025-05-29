import React, { useState, useEffect } from 'react';
import { fetchFootballScores } from '../utils/api';
import ScoreCard from './ScoreCard';
import Pagination from './Pagination';
import { Loader, RefreshCw, AlertCircle } from 'lucide-react';

const ScoresLayout = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  
  const ITEMS_PER_PAGE = 5;

  const fetchScores = async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchFootballScores(page, ITEMS_PER_PAGE);
      
      setScores(response.data);
      setTotalPages(Math.ceil(response?.count / ITEMS_PER_PAGE));
    } catch (err) {
      setError('Failed to fetch football scores. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchScores(currentPage);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchScores(currentPage);
  }, [currentPage]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Football Scores</h1> */}
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center cursor-pointer px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-2" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader size={32} className="text-indigo-600 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading scores...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {scores?.map((match) => (
              <ScoreCard key={match.id} match={match} />
            ))}
          </div>

          {scores?.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No matches found for the selected criteria.
            </div>
          )}

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ScoresLayout;