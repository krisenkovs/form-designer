import React from 'react';

import { Button } from 'antd';

const FlowButton = (props) => {
    const style = {
        bottom: props.bottom,
        left: props.left,
        position: "absolute",
        right: props.right
    }

    return (
        <div style={style}>
            <Button
                onClick={props.onClick}
                type={props.type}
                icon={props.icon}
                size="large"
                disabled={props.disabled}
                shape="circle"
            />
        </div>
    )
}

export default FlowButton 