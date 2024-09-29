import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Menu({ openFile, handleSaveAs }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenFile = async () => {
    setIsLoading(true);
    await openFile(); // Assuming openFile returns a promise
    setIsLoading(false);
  };

  const handleSaveFile = async () => {
    setIsLoading(true);
    await handleSaveAs(); // Assuming handleSaveAs returns a promise
    setIsLoading(false);
  };


  return (
    <div className="menu bg-gray-100 p-4 w-64 h-full shadow-lg">
      <h2 className="font-bold text-xl mb-4">Options</h2>

      {/* Open File Option */}
      <button
        onClick={handleOpenFile}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Open Shape File"
        disabled={isLoading}
      >
        {isLoading ? 'Opening...' : 'Open Shape File'}
      </button>

      {/* Save As Option */}
      <button
        onClick={handleSaveFile}
        className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Save As"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save As'}
      </button>

      {/* Future Menu Options Placeholder */}
      <ul className="menu-options">
        <li className="text-gray-600 mb-2">Future Option 2</li>
        <li className="text-gray-600 mb-2">Future Option 3</li>
      </ul>
    </div>
  );
}

// Prop types for the Menu component
Menu.propTypes = {
  openFile: PropTypes.func.isRequired,
  handleSaveAs: PropTypes.func.isRequired,
  handleAddShape: PropTypes.func.isRequired,
};
