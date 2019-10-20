import React from 'react';

const DragableLine = (props) => {
    return (
        <line x1={props.x} y1={props.y} x2={props.x1} y2={props.y1} stroke="#238df9" strokeDasharray="5,5" />
    )
}

export default DragableLine;