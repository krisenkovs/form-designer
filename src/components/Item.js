import React from 'react';

import { Button } from 'antd'

const styles = {
    item: {
        marginBottom: "10px"
    }
}

const Item = (props) => {
    return (
        <div style={styles.item} >
            {props.settings.panelShape === "circle" &&
                <Button
                    type="primary"
                    shape="circle"
                    icon="share-alt"
                    size="large"
                    onClick={handleItemClick}
                ></Button>
            }
            {props.settings.panelShape === "rectangle" &&
                <Button
                    type="primary"
                    shape="circle"
                    icon="border"
                    size="large"
                    onClick={handleItemClick}
                ></Button>
            }
        </div>
    )

    function handleItemClick(e) {
        if (props.onClick) {
            let x = e.pageX - e.pageX % 5;
            let y = e.pageY - e.pageY % 5;

            props.onClick(e, { ...props.settings, x: x - props.settings.width / 2, y: y - props.settings.height / 2, type: "StepNode", cx: x, cy: y });
        }
    }
}

export default Item;