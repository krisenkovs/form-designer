import React from 'react';

const Anchor = (props) => {
    return (
        <circle
            cx={props.x}
            cy={props.y}
            r="4"
            stroke="#238df9"
            strokeWidth="1"
            fill="white"
            data-index={1}
            onMouseDown={props.onMouseDown}
        />
    )
}

export default Anchor