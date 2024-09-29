import React, { useState } from 'react';

const ShapeCreation = ({ onAddShape }) => {
    const [shapeType, setShapeType] = useState('Circle');
    const [size, setSize] = useState(50);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [color, setColor] = useState('#000000');
    const [message, setMessage] = useState('');

    const handleAddShape = () => {
        // Validate inputs
        if (size <= 0 || position.x < 0 || position.y < 0) {
            setMessage('Size and position must be positive numbers.');
            return;
        }

        const newShape = { type: shapeType, size, position, color };
        console.log("New Shape:", newShape); // Debugging line

        // Call the parent function to add the shape
        onAddShape(newShape);

        // Reset the form
        setShapeType('Circle');
        setSize(50);
        setPosition({ x: 0, y: 0 });
        setColor('#000000');
        setMessage('Shape added successfully!');
    };

    return (
        <div className="shape-creation">
            <h3>Create a New Shape</h3>
            {message && <p className="message">{message}</p>}
            <label>
                Type:
                <select value={shapeType} onChange={(e) => setShapeType(e.target.value)}>
                    <option value="Circle">Circle</option>
                    <option value="Square">Square</option>
                    <option value="Rectangle">Rectangle</option>
                </select>
            </label>
            <label>
                Size:
                <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(Math.max(1, e.target.value))}
                    min="1"
                />
            </label>
            <label>
                Position X:
                <input
                    type="number"
                    value={position.x}
                    onChange={(e) => setPosition({ ...position, x: Math.max(0, e.target.value) })}
                />
            </label>
            <label>
                Position Y:
                <input
                    type="number"
                    value={position.y}
                    onChange={(e) => setPosition({ ...position, y: Math.max(0, e.target.value) })}
                />
            </label>
            <label>
                Color:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <button onClick={handleAddShape}>Add Shape</button>
        </div>
    );
};

export default ShapeCreation;
