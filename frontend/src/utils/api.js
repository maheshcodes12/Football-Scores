import axios from 'axios';
import { CloudCog } from 'lucide-react';

export const fetchFootballScores = async (page, limit) => {
  try {
    const response = await axios.get('http://localhost:3000/api/matches');
    const allMatches = response.data?.data || [];
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMatches = allMatches.slice(startIndex, endIndex);

    return {
      success: true,
      count: allMatches.length,
      data: paginatedMatches.map(match => ({
        ...match,
        homeGoals:match.homeGoals||0,
        awayGoals:match.awayGoals||0,
        timestamp: formatCustomTime(match.timestamp)
      }))
    };
  } catch (error) {
    console.error('Error fetching football scores:', error);
    throw error;
  }
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffInHours = Math.abs(now - date) / 36e5; 

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours}h ago`;
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

function formatCustomTime(timestamp, customHour = 0, customMinute = 0) {
    const date = new Date(timestamp * 1000);

    date.setHours(customHour);
    date.setMinutes(customMinute);
    
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    return `${date.toLocaleDateString('en-US', dateOptions)}, ${date.toLocaleTimeString('en-US', timeOptions)}`;
}