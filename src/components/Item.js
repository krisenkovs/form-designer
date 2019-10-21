import React from 'react';

const Item = (props) => {
    return (
        <a className="item"
            href="#"
            onClick={handleItemClick}
        >
            <i className={`${props.icon} icon`} />
            {props.label}
        </a>

    )

    function handleItemClick(e) {
        if (props.onClick) {
            let x = e.pageX - e.pageX % 5;
            let y = e.pageY - e.pageY % 5;

            props.onClick(e, {
                ...props,
                x: x - props.width / 2,
                y: y - props.height / 2,
                cx: x,
                cy: y,
                node: true,
                anchor: false
            });
        }
    }
}

export default Item;