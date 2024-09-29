import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Menu from './components/Menu';
import ShapeViewport from './components/ShapeViewport';
import { parseShapeFile, renderShapes } from './utils/shapeUtils';
import './style.css';

function App() {
  const [fileName, setFileName] = useState(null);  // Store uploaded file name
  const [shapes, setShapes] = useState([]);  // Store shapes parsed from file

  // Handle the file upload and parsing of the shape file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];  // Get the uploaded file
    if (file) {
      setFileName(file.name);  // Set the file name

      // Read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const parsedShapes = parseShapeFile(fileContent);  // Parse shapes
        setShapes(parsedShapes);  // Update shapes in state
      };
      reader.readAsText(file);  // Read the file as text
    }
  };

  // Render shapes whenever the shapes array is updated
  useEffect(() => {
    if (shapes.length > 0) {
      renderShapes('shapeCanvas', shapes);  // Call utility to render shapes
    }
  }, [shapes]);  // Dependency array: re-render when shapes change

  // Function to handle "Save As" logic
  const handleSaveAs = () => {
    const newName = prompt("Enter new shape file name:");
    if (newName) {
      saveShapesToFile(newName, shapes);
    }
  };

  // Helper function to save shapes to a file
  const saveShapesToFile = (fileName, shapes) => {
    const blob = new Blob([JSON.stringify(shapes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;  // Save the file with a new name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to update shapes, passed to ShapeViewport
  const updateShapes = (updatedShapes) => {
    setShapes(updatedShapes);
  };

  return (
    <div className="app">
      {/* Toolbar for uploading file */}
      <Toolbar
        fileName={fileName}  // Display file name
        openFile={() => document.getElementById('fileInput').click()}  // Trigger hidden file input
      />

      {/* Hidden input for file selection */}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}  // Hidden file input
        onChange={handleFileUpload}  // Call handleFileUpload on file selection
        accept=".shapefile"  // Accept only specific file types
      />

      <div className="main-layout" style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar for future menu options */}
        <Menu openFile={() => document.getElementById('fileInput').click()} handleSaveAs={handleSaveAs} />

        {/* Main canvas area to render shapes */}
        <ShapeViewport shapes={shapes} updateShapes={updateShapes} />
      </div>
    </div>
  );
}

export default App;
