import React from 'react';

function StepNode(props) {
    return (
        <circle
            cx={props.x}
            cy={props.y}
            r="20"
            stroke="black"
            strokeWidth="3"
            fill="transparent"
            data-id={props.id}
            onMouseDown={handleMouseDown}
        />
    )

    function handleMouseDown(e) {
        e.stopPropagation();
        if (props.onMouseDown) {
            props.onMouseDown(e, { type: 'StepNode', id: props.id })
        }
    }

}

export default StepNode;