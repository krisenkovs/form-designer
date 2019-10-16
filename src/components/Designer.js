import React, { useState, useEffect } from 'react';

import StepNode from './StepNode';

function Designer(props) {
    const [nodes, setNodes] = useState([{ x: 25, y: 45, id: 1 }, { x: 85, y: 85, id: 2 }]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [coord, setCoord] = useState(null);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => document.removeEventListener('mousemove', handleMouseMove);;
    });

    return (
        <svg
            width={props.width}
            height={props.height}
            onMouseDown={handleOverMouseDown}
            onMouseUp={handleOverMouseUp}
        >
            {nodes.map((node, index) =>
                <StepNode
                    x={node.x}
                    y={node.y}
                    id={node.id}
                    key={index}
                    onMouseDown={handleMouseDown}
                />
            )}
        </svg>
    );

    function handleMouseMove(e) {
        if (coord) {
            if (selectedNode && selectedNode.type === 'StepNode') {
                let newData = [...nodes];

                newData.forEach(node => {
                    if (node.id === selectedNode.id) {
                        node.x = e.pageX;
                        node.y = e.pageY;
                    }
                });

                setNodes(newData);
            }

        }
    }

    function handleMouseDown(e, data) {
        setSelectedNode(data);
        setCoord({ x: e.target.x, y: e.target.y });
    }

    function handleOverMouseDown(e) {
        setSelectedNode(null);
    }

    function handleOverMouseUp(e) {
        setCoord(null);
    }
}

export default Designer;