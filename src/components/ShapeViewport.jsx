import React, { useEffect, useRef, useState } from 'react';

export default function ShapeViewport({ shapes, updateShapes }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedShape, setDraggedShape] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Render shapes on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas before drawing new shapes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Iterate through shapes and draw them
    shapes.forEach(({ shapeType, x, y, width, height, color }) => {
      ctx.fillStyle = `#${color}`;

      if (shapeType === 'Rectangle') {
        ctx.fillRect(x, y, width, height);
      } else if (shapeType === 'Triangle') {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width / 2, y - height);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fill();
      }
    });
  }, [shapes]);

  // Handle mouse down event for dragging shapes
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse is over any shape
    const foundShape = shapes.find(({ shapeType, x, y, width, height }) => {
      if (shapeType === 'Rectangle') {
        return (
          mouseX >= x &&
          mouseX <= x + width &&
          mouseY >= y &&
          mouseY <= y + height
        );
      } else if (shapeType === 'Triangle') {
        return (
          mouseX >= x && 
          mouseX <= x + width &&
          mouseY <= y &&
          mouseY >= y - height
        );
      }
      return false;
    });

    if (foundShape) {
      setIsDragging(true);
      setDraggedShape(foundShape);
      setOffset({ x: mouseX - foundShape.x, y: mouseY - foundShape.y });
    }
  };

  // Handle shape dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !draggedShape) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const updatedShapes = shapes.map((shape) => {
      if (shape === draggedShape) {
        return {
          ...shape,
          x: mouseX - offset.x,
          y: mouseY - offset.y,
        };
      }
      return shape;
    });

    updateShapes(updatedShapes);
  };

  // End shape dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedShape(null);
  };

  return (
    <div className="shape-viewport flex-grow">
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        className="w-full h-full border"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the canvas
      ></canvas>
    </div>
  );
}
