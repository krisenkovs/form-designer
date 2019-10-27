import React, { useState } from 'react';

import Anchor from './Anchor';

import config from './config';

function StepNode(props) {
    const [hover, setHover] = useState(false);

    const node = config.nodes[props.type];

    return (
        <g>
            <rect
                x={props.x}
                y={props.y}
                rx={node.radius}
                ry={node.radius}
                width={node.width}
                height={node.height}
                stroke={node.color}
                fill={props.selected ? `${node.color}44` : `${node.color}11`}
                strokeWidth={props.selected ? "2" : "1"}
                data-id={props.id}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={handleDoubleClick}
            />
            <text
                x={props.x + node.width / 2}
                y={props.y + node.height / 2}
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
                {node.anchors.map((anchor, index) => {
                    if (hover || (props.showInAnchors && anchor.in)) {
                        return (
                            <Anchor
                                key={index}
                                x={props.x + anchor.x}
                                y={props.y + anchor.y}
                                index={index}
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
                height: node.height,
                width: node.width,
                type: props.type,
                label: props.label
            });
        }
    }

    function handleAnchorMouseDown(e) {
        e.stopPropagation();
        if (props.onAnchorMouseDown) {
            const anchor = node.anchors[e.target.dataset.index];

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