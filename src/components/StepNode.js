import React, { useState } from 'react';

import Anchor from './Anchor';

function StepNode(props) {
    const [hover, setHover] = useState(false);

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
                fill={props.selected ? `${props.color}44` : `${props.color}11`}
                strokeWidth={props.selected ? "2" : "1"}
                data-id={props.id}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={handleDoubleClick}
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

            <g>
                {props.anchors.map((anchor, index) => {
                    if ((hover && anchor.out.length > 0) || props.visibleAnchors.indexOf(`${props.id}:${index}`) !== -1) {
                        return (
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
                        )
                    }
                    return null;
                })}
            </g>
        </g >
    )

    function handleMouseDown(e) {
        e.stopPropagation();

        if (props.onMouseDown) {
            props.onMouseDown(e, {
                id: props.id,
                x: props.x,
                y: props.y,
                height: props.height,
                width: props.width
            });
        }
    }

    function handleAnchorMouseDown(e) {
        e.stopPropagation();
        if (props.onAnchorMouseDown) {
            const anchor = props.anchors[e.target.dataset.index];

            props.onAnchorMouseDown(e, {
                id: props.id,
                index: e.target.dataset.index,
                x: props.x + anchor.x,
                y: props.y + anchor.y
            });
        }
    }

    function handleAnchorMouseUp(e) {
        e.stopPropagation();
        if (props.onAnchorMouseUp) {
            props.onAnchorMouseUp(e, {
                id: props.id,
                index: e.target.dataset.index
            });
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

    function handleDoubleClick(e) {
        e.stopPropagation();
        if (props.onItemDoubleClick) {
            props.onItemDoubleClick(e, {
                ...props
            });
        }
    }
}

export default StepNode;