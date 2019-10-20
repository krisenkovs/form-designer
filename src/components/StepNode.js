import React, { useState } from 'react';

import Anchor from './Anchor';

function StepNode(props) {
    const [hover, setHover] = useState(false)

    return (
        <g>
            <rect
                x={props.x}
                y={props.y}
                rx={props.radius}
                ry={props.radius}
                width={props.width}
                height={props.height}
                stroke={props.color}
                fill={props.selected ? `${props.color}66` : `${props.color}11`}
                strokeWidth={props.selected ? "2" : "1"}
                data-id={props.id}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

            />
            <text
                x={props.x + props.width / 2}
                y={props.y + props.height / 2}
                dy="0.3em"
                fill="#232c38"
                fontSize="11px"
                style={{
                    userSelect: "none",
                    pointerEvents: "none"
                }}

                textAnchor="middle"
            > {props.label} </text>

            {
                (props.selected || hover) &&
                <g>
                    {props.anchors.map((anchor, index) =>
                        <Anchor
                            key={index}
                            x={props.x + anchor.x}
                            y={props.y + anchor.y}
                            index={anchor.index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={handleAnchorMouseDown}
                            onMouseUp={handleAnchorMouseUp}
                        />
                    )}
                </g>
            }
        </g >
    )

    function handleMouseDown(e) {
        e.stopPropagation();
        if (props.onMouseDown) {
            props.onMouseDown(e, { type: 'StepNode', id: props.id, width: props.width, height: props.height, x: props.x, y: props.y });
        }
    }

    function handleAnchorMouseDown(e) {
        e.stopPropagation();
        if (props.onAnchorMouseDown) {
            const anchor = props.anchors[e.target.dataset.index];

            props.onAnchorMouseDown(e, { type: 'Anchor', id: props.id, index: e.target.dataset.index, x: props.x + anchor.x, y: props.y + anchor.y, x1: props.x + anchor.x, y1: props.y + anchor.y });
        }
    }

    function handleAnchorMouseUp(e) {
        e.stopPropagation();
        if (props.onAnchorMouseUp) {
            props.onAnchorMouseUp(e, { type: 'Anchor', id: props.id, index: e.target.dataset.index, x: props.x, y: props.y });
        }
    }

    function handleMouseEnter(e) {
        e.stopPropagation();
        setHover(true);
    }

    function handleMouseLeave(e) {
        e.stopPropagation();
        setHover(false);
    }

}

export default StepNode;