import React from 'react';

import Item from './Item';

import config from './itemsConfig';

const styles = {
    panel: {
        background: "#FAFAFA",
        border: "solid 1px #CCC",
        borderRadius: "3px",
        position: "absolute",
        left: "20px",
        top: "20px"
    }
}

const ItemPanel = (props) => {

    return (
        <div style={styles.panel}>
            {Object.keys(config.nodes).map((key, index) => {
                const item = config.nodes[key];

                if (item.visibleOnPanel) {
                    return <Item {...item} onClick={props.onItemClick} key={index} />
                } else {
                    return null;
                }
            })}
        </div>
    )
}

export default ItemPanel;