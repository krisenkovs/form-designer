import React, { Fragment } from 'react';

import Item from './Item';

import { Avatar } from 'antd';

import config from './itemsConfig';
import styless from './ItemPanel.module.css';

const styles = {
    panel: {
        position: "absolute",
        left: "20px",
        top: "50px"
    },

    panelAnt: {
        position: "absolute",
        left: "20px",
        top: "300px",
        display: "flex",
        flexDirection: "column"
    },
    avatar: {
        background: "#74ab7811",
        marginBottom: "10px",
        userSelect: "none",
        verticalAlign: "middle",
        ":hover": {
            background: "blue",
            border: "1px solid black"
        },
        "&:active": {
            background: "blue",
        }

    }
}

const ItemPanel = (props) => {
    console.log(styless)
    return (
        <Fragment>
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
            <div className={styless.panel}>
                <Avatar className={styless.panel_item} size={56}>
                    S
                </Avatar>
                <Avatar className={styless.panel_item} size={56}>
                    F
                </Avatar>
            </div>
        </Fragment>
    )
}

export default ItemPanel;