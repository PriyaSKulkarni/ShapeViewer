// shapeUtils.js

// Function to parse the custom shape file content into a usable array of shapes
export function parseShapeFile(fileContent) {
    const shapes = fileContent
      .trim()               // Remove any trailing whitespace
      .split(";")           // Split file into lines by semicolons
      .filter(Boolean)      // Filter out any empty lines
      .map(line => {
        const [shapeType, x, y, zIndex, width, height, color] = line.split(",");
        return {
          shapeType: shapeType.trim(),
          x: parseInt(x.trim()),
          y: parseInt(y.trim()),
          zIndex: parseInt(zIndex.trim()),
          width: parseInt(width.trim()),
          height: parseInt(height.trim()),
          color: color.trim(),
        };
      });
  
    return shapes;
  }
  
  // Function to render shapes on the canvas
  export function renderShapes(canvasId, shapes) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
  
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
  }
  