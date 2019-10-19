import React, { useState, useEffect } from 'react';

import StepNode from './StepNode';
import JumpNode from './JumpNode';

function Designer(props) {
    const [nodes, setNodes] = useState([{
        x: 25, y: 45, id: 1, width: 40,
        height: 40,
        radius: 20,
        anchors: [
            {
                index: 0,
                x: 20,
                y: 0
            },
            {
                index: 1,
                x: 40,
                y: 20
            },
            {
                index: 2,
                x: 20,
                y: 20
            },
            {
                index: 3,
                x: 0,
                y: 20
            },
        ]
    }, {
        x: 85, y: 85, id: 2, width: 50,
        height: 50,
        radius: 25,
        anchors: [
            {
                index: 0,
                x: 25,
                y: 0
            },
            {
                index: 1,
                x: 50,
                y: 25
            },
            {
                index: 2,
                x: 25,
                y: 50
            },
            {
                index: 3,
                x: 0,
                y: 25
            },
        ]
    }]);
    const [edges, setEdges] = useState([]);
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
                    {...node}
                    selected={selectedNode && node.id === selectedNode.id}
                    onMouseDown={handleMouseDown}
                    onAnchorMouseDown={handleAnchorMouseDown}
                />
            )}
            {edges.map((edge, index) =>
                <JumpNode
                    x={edge.x}
                    y={edge.y}
                    x1={edge.x1}
                    y1={edge.y1}
                    targetId={edge.id}
                    key={index}
                />
            )}
        </svg>
    );

    function handleMouseMove(e) {


        if (coord) {
            const diffX = Math.abs(e.pageX - coord.x);
            const diffY = Math.abs(e.pageY - coord.y);

            if (diffX < 5 && diffY < 5) {
                return;
            }


            if (selectedNode && selectedNode.type === 'StepNode') {
                let newData = [...nodes];

                newData.forEach(node => {
                    if (node.id === selectedNode.id) {
                        node.x = e.pageX - node.height / 2;
                        node.y = e.pageY - node.width / 2;
                    }
                });

                setNodes(newData);
                setCoord({ x: e.pageX, y: e.pageY });
            }

            if (selectedNode && selectedNode.type === 'Anchor') {
                let newData = [...edges];

                newData.forEach(node => {
                    if (node.id === selectedNode.id) {
                        node.x1 = e.pageX;
                        node.y1 = e.pageY;
                    }
                });

                setEdges(newData);
                setCoord({ x: e.pageX, y: e.pageY });
            }
        }
    }

    function handleMouseDown(e, data) {
        setSelectedNode(data);
        setCoord({ x: e.target.x, y: e.target.y });
    }

    function handleAnchorMouseDown(e, data) {
        console.log(data)
        const newEdges = [...edges];
        newEdges.push({ ...data, x: e.pageX, y: e.pageY, x1: e.pageX, y1: e.pageY })
        setEdges(newEdges);
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