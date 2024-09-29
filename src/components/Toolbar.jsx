import React from 'react';

export default function Toolbar({ fileName, openFile }) {
  return (
    <div className="toolbar bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* App Name */}
      <div className="app-name text-lg font-semibold">Shape Viewer</div>

      {/* Open File Button or File Name */}
      <div className="file-action">
        {fileName ? (
          <span className="file-name">File: {fileName}</span>
        ) : (
          <button
            onClick={openFile}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Open Shape File
          </button>
        )}
      </div>
    </div>
  );
}
