import React, { useState } from 'react';
import ShapeCreation from './ShapeCreation';

const ShapeViewer = () => {
    const [shapes, setShapes] = useState([]);

    const handleAddShape = (newShape) => {
        console.log("Before Adding:", shapes);
        setShapes((prevShapes) => [...prevShapes, newShape]);
        console.log("Added Shape:", newShape);
        console.log("After Adding:", [...shapes, newShape]);
    };

    return (
        <div>
            <ShapeCreation onAddShape={handleAddShape} />
            <h3>Shapes</h3>
            <ul>
                {shapes.map((shape, index) => (
                    <li key={index}>
                        Shape {index}: {shape.type}, Size: {shape.size}, Position: ({shape.position.x}, {shape.position.y}), Color: {shape.color}
                    </li>
                ))}
            </ul>
            {/* Add any additional rendering or validation logic here */}
        </div>
    );
};

export default ShapeViewer;
