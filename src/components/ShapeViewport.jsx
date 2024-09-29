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
    shapes.forEach(({ shapeType, points, x, y, width, height, color }) => {
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
      } else if (shapeType === 'Polygon' && points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill();
      }
    });
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      if (shape.type === 'Circle') {
          ctx.beginPath();
          ctx.arc(shape.position.x, shape.position.y, shape.size, 0, Math.PI * 2);
          ctx.fill();
      } else if (shape.type === 'Square') {
          ctx.fillRect(shape.position.x, shape.position.y, shape.size, shape.size);
      } else if (shape.type === 'Rectangle') {
          ctx.fillRect(shape.position.x, shape.position.y, shape.size * 2, shape.size);
      }
  });
  }, [shapes]);

  // Handle mouse down event for dragging shapes
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
  
    const ctx = canvas.getContext('2d');  // Define ctx here
  
    // Check if the mouse is over any shape
    const foundShape = shapes.find(({ shapeType, points, x, y, width, height }) => {
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
      } else if (shapeType === 'Polygon' && points) {
        // Create path for polygon and check if point is within it
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
  
        return ctx.isPointInPath(mouseX, mouseY);
      }
      return false;
    });
  
    if (foundShape) {
      setIsDragging(true);
      setDraggedShape(foundShape);
      setOffset({ x: mouseX - (foundShape.shapeType === 'Polygon' ? foundShape.points[0].x : foundShape.x), 
                   y: mouseY - (foundShape.shapeType === 'Polygon' ? foundShape.points[0].y : foundShape.y) });
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
        if (shape.shapeType === 'Polygon' && shape.points) {
          const dx = mouseX - offset.x;
          const dy = mouseY - offset.y;

          // Update the position of each point in the polygon
          return {
            ...shape,
            points: shape.points.map(point => ({
              x: point.x + dx - draggedShape.points[0].x,
              y: point.y + dy - draggedShape.points[0].y,
            })),
          };
        } else {
          return {
            ...shape,
            x: mouseX - offset.x,
            y: mouseY - offset.y,
          };
        }
      }
      return shape;
    });

    updateShapes(updatedShapes);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedShape(null);
  };

  return (
    <div className="shape-viewport flex-grow">
      <canvas
        ref={canvasRef}
        width={800} // Set the desired width
        height={600} // Set the desired height
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)} // Optional: to stop dragging on mouse leave
       
      />
    </div>
  );
}
