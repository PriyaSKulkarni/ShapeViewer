// shapeUtils.js
// shapeUtils.js

// Function to parse the custom shape file content into a usable array of shapes
// shapeUtils.js

// Function to parse the custom shape file content into a usable array of shapes
export function parseShapeFile(fileContent) {
    const shapes = fileContent
      .trim()
      .split(";")
      .filter(Boolean)
      .map(line => {
        const [shapeType, ...params] = line.split(",").map(param => param.trim());
        let shape = { shapeType };

        if (shapeType === 'Polygon') {
          const color = params.pop().trim(); // Extract the color
          shape.points = params.map(p => {
            const [x, y] = p.split(" ").map(Number);
            return { x, y };
          });
          shape.color = color; // Store the color in the shape object
        } else {
          shape.x = parseInt(params[0]);
          shape.y = parseInt(params[1]);
          shape.zIndex = parseInt(params[2]);
          shape.width = parseInt(params[3]);
          shape.height = parseInt(params[4]);
          shape.color = params[5];
        }
        
        return shape;
      });
  
    return shapes;
}

// shapeUtils.js

// Function to render shapes on the canvas
export function renderShapes(canvasId, shapes) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(({ shapeType, points, x, y, width, height, color }) => {
      ctx.fillStyle = `#${color}`; // Set the fill color based on the shape's color

      if (shapeType === 'Rectangle') {
        ctx.fillRect(x, y, width, height);
      } else if (shapeType === 'Triangle') {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width / 2, y - height);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fill();
      } else if (shapeType === 'Polygon') {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill(); // Fill with the specified color
      }
    });
}
