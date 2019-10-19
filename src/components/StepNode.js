import React from 'react';

import Anchor from './Anchor';

const defaultProps = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    radius: 20,
    anchors: [
        {
            index: 0,
            x: 20,
            y: 0
        },
        {
            index: 1,
            x: 40,
            y: 20
        },
        {
            index: 2,
            x: 20,
            y: 20
        },
        {
            index: 3,
            x: 20,
            y: 40
        },
    ]
}

function StepNode(props) {
    return (
        <g>
            <rect
                x={props.x - 1}
                y={props.y - 1}
                rx={props.radius + 1}
                ry={props.radius + 1}
                width={props.width + 2}
                height={props.height + 2}
                stroke="#ffc069"
                strokeWidth="1"
                opacity="0.7"
                fill="#fef7e7"
            />
            <rect
                x={props.x}
                y={props.y}
                rx={props.radius}
                ry={props.radius}
                width={props.width}
                height={props.height}
                stroke="#ffc069"
                strokeWidth="1"
                fill="#fef7e7"
                data-id={props.id}
                onMouseDown={handleMouseDown}
            />
            {props.selected &&
                <g>
                    {props.anchors.map((anchor, index) =>
                        <Anchor
                            x={props.x + anchor.x}
                            y={props.y + anchor.y}
                            index={anchor.index}
                        />
                    )}
                </g>
            }
        </g>
    )

    function handleMouseDown(e) {
        e.stopPropagation();
        if (props.onMouseDown) {
            props.onMouseDown(e, { type: 'StepNode', id: props.id })
        }
    }

    function handleAnchorMouseDown(e) {
        e.stopPropagation();
        if (props.onAnchorMouseDown) {
            props.onAnchorMouseDown(e, { type: 'Anchor', id: props.id, index: e.target.dataset.index });
        }
    }

}

export default StepNode;