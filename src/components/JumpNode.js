import React from 'react';

import config from './config';
import useGlobal from '../Store';

function JumpNode(props) {
    const [store] = useGlobal((store) => {
        return {
            nodes: store.nodes,
            lines: store.lines
        }
    });

    let x, y, x1, y1, targetDirection, sourceDirection, anchor, nodeType;

    nodeType = store.nodes[props.targetId].type;
    anchor = config.nodes[nodeType].anchors[props.targetIndex];
    x1 = store.nodes[props.targetId].x + anchor.x;
    y1 = store.nodes[props.targetId].y + anchor.y;
    targetDirection = anchor.direction;

    nodeType = store.nodes[props.sourceId].type;
    anchor = config.nodes[nodeType].anchors[props.sourceIndex];
    x = store.nodes[props.sourceId].x + anchor.x;
    y = store.nodes[props.sourceId].y + anchor.y;
    sourceDirection = anchor.direction;

    let startPoint = [x, y];
    let endPoint = [x1, y1];
    let firstControlPoint = [x, y];
    let secondControlPoint = [x1, y1];

    switch (targetDirection) {
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

    switch (sourceDirection) {
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
                stroke="transparent"
                strokeWidth={5}
                fill="none"
                onMouseDown={handleMouseDown}
            />
            <path
                d={`M${startPoint} C${firstControlPoint} ${secondControlPoint} ${endPoint}`}
                stroke="grey"
                strokeWidth={props.selected ? 2 : 1}
                markerEnd="url(#arrow)"
                fill="none"
                onMouseDown={handleMouseDown}
            />
        </svg >

    )

    function handleMouseDown(e) {
        e.stopPropagation();

        if (props.onMouseDown) {
            props.onMouseDown(e, {
                id: props.id,
                x: x,
                y: y,
                targetId: props.targetId,
                sourceId: props.sourceId,
                targetIndex: props.targetIndex,
                sourceIndex: props.sourceIndex
            });
        }
    }
}

export default JumpNode;