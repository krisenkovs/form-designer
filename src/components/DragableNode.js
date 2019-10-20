import React from 'react';

function DragableNode(props) {

    return (
        <g>
            <rect
                x={props.x}
                y={props.y}
                rx={2}
                ry={2}
                width={props.width}
                height={props.height}
                stroke="#238df9"
                strokeDasharray="5,5"
                fill="transparent"
                strokeWidth="1"
            />
        </g>
    )
}

export default DragableNode;