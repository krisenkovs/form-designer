import React from 'react';

function JumpNode(props) {
    let startPoint = [props.x, props.y];
    let endPoint = [props.x1, props.y1];
    let firstControlPoint = [props.x, props.y];
    let secondControlPoint = [props.x1, props.y1];

    switch (props.targetDirection) {
        case "left":
            secondControlPoint[0] = secondControlPoint[0] - 30;
            endPoint[0] = endPoint[0] - 2;
            break;
        case "top":
            secondControlPoint[1] = secondControlPoint[1] - 30;
            endPoint[1] = endPoint[1] - 2;
            break;
        case "bottom":
            secondControlPoint[1] = secondControlPoint[1] + 30;
            endPoint[1] = endPoint[1] + 2;
            break;
        case "right":
            secondControlPoint[0] = secondControlPoint[0] + 30;
            endPoint[0] = endPoint[0] + 2;
            break;
        default: ;
    }

    switch (props.sourceDirection) {
        case "left":
            firstControlPoint[0] = firstControlPoint[0] - 30;
            break;
        case "top":
            firstControlPoint[1] = firstControlPoint[1] - 30;
            break;
        case "bottom":
            firstControlPoint[1] = firstControlPoint[1] + 30;
            break;;
        case "right":
            firstControlPoint[0] = firstControlPoint[0] + 30;
            break;
        default: ;
    }

    return (
        <svg>
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="3"
                    refY="2"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M0,0 L0,4 L5,2 z"
                        fill="grey" />
                </marker>
            </defs>
            <path
                d={`M${startPoint} C${firstControlPoint} ${secondControlPoint} ${endPoint}`}
                stroke="grey"
                markerEnd="url(#arrow)"
                fill="none"
            />
        </svg>
    )
}

export default JumpNode;