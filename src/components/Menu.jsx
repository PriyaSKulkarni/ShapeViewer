import React from 'react';

export default function Menu({ openFile, handleSaveAs }) {
  return (
    <div className="menu bg-gray-100 p-4 w-64 h-full shadow-lg">
      <h2 className="font-bold text-xl mb-4">Options</h2>

      {/* Open File Option */}
      <button
        onClick={openFile}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
      >
        Open Shape File
      </button>

      {/* Save As Option */}
      <button
        onClick={handleSaveAs} // Trigger the save function passed from parent
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
      >
        Save As
      </button>

      {/* Future Menu Options Placeholder */}
      <ul className="menu-options">
        <li className="text-gray-600 mb-2">Future Option 2</li>
        <li className="text-gray-600 mb-2">Future Option 3</li>
      </ul>
    </div>
  );
}
