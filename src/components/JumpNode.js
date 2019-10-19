import React from 'react';



function JumpNode(props) {
    return (
        <g>
            <line x1={props.x} y1={props.y} x2={props.x1} y2={props.y1} stroke="black" />
        </g>
    )


}

export default JumpNode;