import React from 'react';

import { Avatar } from 'antd';

import styless from './Item.module.css';

const Item = (props) => {
    return (
        <Avatar className={styless.panel_item} size={56} onClick={handleItemClick}>
            {props.label[0]}
        </Avatar>
    )

    function handleItemClick(e) {
        if (props.onClick) {
            //let x = e.pageX - e.pageX % 5;
            //let y = e.pageY - e.pageY % 5;

            props.onClick(e, {
                ...props,
                //x: x - props.width / 2,
                //y: y - props.height / 2
            });
        }
    }
}

export default Item;