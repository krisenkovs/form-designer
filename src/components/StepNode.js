import React, { useState } from 'react';

import Anchor from './Anchor';

function StepNode(props) {
    const [hover, setHover] = useState(false);

    return (
        <g>
            <rect
                x={props.x - 1}
                y={props.y - 1}
                rx={props.radius + 1}
                ry={props.radius + 1}
                width={props.width + 2}
                height={props.height + 2}
                fill={hover ? `${props.color}66` : "transparent"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
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
                    if ((!props.dragItemType && (props.selected || hover) && anchor.out.length > 0) ||
                        (props.dragAnchor && anchor.in.indexOf(props.dragItemType) !== -1)) {
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
                ...props,
                node: true,
                anchor: false
            });
        }
    }

    function handleAnchorMouseDown(e) {
        e.stopPropagation();
        if (props.onAnchorMouseDown) {
            const anchor = props.anchors[e.target.dataset.index];

            props.onAnchorMouseDown(e, {
                ...props,
                node: false,
                anchor: true,
                index: e.target.dataset.index,
                x: props.x + anchor.x,
                y: props.y + anchor.y,
                x1: props.x + anchor.x,
                y1: props.y + anchor.y
            });
        }
    }

    function handleAnchorMouseUp(e) {
        e.stopPropagation();
        if (props.onAnchorMouseUp) {
            props.onAnchorMouseUp(e, {
                ...props,
                node: false,
                anchor: true,
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