import React, { Fragment } from 'react';

import Item from './Item';

import config from './itemsConfig';
import styless from './ItemPanel.module.css';

const ItemPanel = (props) => {
    return (
        <Fragment>
            <div className={styless.panel}>
                {Object.keys(config.nodes).map((key, index) => {
                    const item = config.nodes[key];

                    if (item.visibleOnPanel) {
                        return <Item
                            {...item}
                            onClick={props.onItemClick}
                            key={index}
                        />
                    } else {
                        return null;
                    }
                })}
            </div>
        </Fragment>
    )
}

export default ItemPanel;