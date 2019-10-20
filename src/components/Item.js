import React, { useState } from 'react';

const styles = {
    item: {
        width: "26px",
        lineHeight: "26px",
        cursor: "default",
        padding: "10px"
    }
}

const Item = (props) => {
    const [hover, setHover] = useState(false);

    return (
        <div style={styles.item} >
            <svg
                width="26px"
                height="26px"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                shapeRendering="geometricPrecision"
            >
                {props.settings.panelShape === "circle" &&
                    <rect
                        x="1"
                        y="1"
                        height="24px"
                        width="24px"
                        rx="24px"
                        ry="24px"
                        strokeLinejoin="round"
                        stroke={hover ? props.settings.color : "black"}
                        strokeWidth="2"
                        fill="transparent"
                        onClick={handleItemClick}
                    />
                }
                {props.settings.panelShape === "rectangle" &&
                    <rect
                        x="1"
                        y="3"
                        height="20px"
                        width="24px"
                        rx="2px"
                        ry="2px"
                        stroke={hover ? props.settings.color : "black"}
                        strokeWidth="2"
                        fill="transparent"
                        onClick={handleItemClick}
                    />
                }
            </svg>
        </div>
    )

    function handleMouseEnter(e) {
        setHover(true);
    }

    function handleMouseLeave(e) {
        setHover(false);
    }

    function handleItemClick(e) {
        if (props.onClick) {
            let x = e.pageX - e.pageX % 5;
            let y = e.pageY - e.pageY % 5;

            props.onClick(e, { ...props.settings, x: x - props.settings.width / 2, y: y - props.settings.height / 2, type: "StepNode", cx: x, cy: y });
        }
    }
}

export default Item;