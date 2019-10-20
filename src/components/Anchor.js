import React, { useState } from 'react';

const Anchor = (props) => {
    const [hover, setHover] = useState(false)

    return (
        <circle
            cx={props.x}
            cy={props.y}
            r="4"
            stroke="#238df9"
            strokeWidth="1"
            fill={hover ? "#238df9" : "white"}
            data-index={props.index}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )

    function handleMouseEnter(e) {
        e.stopPropagation();
        setHover(true);

        props.onMouseEnter && props.onMouseEnter(e)
    }

    function handleMouseLeave(e) {
        e.stopPropagation();
        setHover(false);

        props.onMouseLeave && props.onMouseLeave(e)
    }
}

export default Anchor