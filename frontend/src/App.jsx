import React, { useState, useEffect } from 'react';
import ScoresLayout from './components/ScoresLayout';

function App() {


  return (
    <div className="min-h-screen w-[99vw] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="bg-gray-50 dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">FS</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Football Scores</h1>
          </div>
          
          
        </div>
      </header>
      
      <main>
        <ScoresLayout />
      </main>
      
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 FootBall Score. All football scores.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;