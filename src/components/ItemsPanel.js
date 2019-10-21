import React from 'react';

import Item from './Item';

import config from './itemsConfig';

const styles = {
    panel: {
        position: "absolute",
        left: "20px",
        top: "50px"
    },
}

const ItemPanel = (props) => {

    return (
        <div className="ui vertical labeled icon menu"
            style={styles.panel}
        >
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
    )
}

export default ItemPanel;