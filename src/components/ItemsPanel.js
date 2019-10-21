import React, { Fragment } from 'react';

import Item from './Item';

import config from './itemsConfig';

const styles = {
    panel: {
        position: "absolute",
        left: "20px",
        top: "20px",
        padding: "10px"
    },
    panels: {
        position: "absolute",
        left: "20px",
        top: "150px",
    }
}

const ItemPanel = (props) => {

    return (
        <Fragment>
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

            <div className="ui vertical labeled icon menu" style={styles.panels}>
                <a className="item" href="#">
                    <i className="circle outline icon"></i>
                    Step
  </a>
                <a className="item" href="#">
                    <i className="stop icon"></i>
                    Form
  </a>

            </div>

        </Fragment>
    )
}

export default ItemPanel;