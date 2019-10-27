import React, { Fragment, useEffect, useState } from 'react';

import StepNode from './StepNode';
import JumpNode from './JumpNode';
import DragableNode from './DragableNode';
import DragableLine from './DragableLine';
import FlowButton from './FlowButton';

import config from './config';
import useGlobal from '../Store';

const Designer = (props) => {
    const [store, actions] = useGlobal((store) => {
        return {
            nodes: store.nodes,
            lines: store.lines,
            selectedNode: store.selectedNode,
            selectedLine: store.selectedLine
        }
    }, (actions) => {
        return {
            addNode: actions.addNode,
            addLine: actions.addLine,
            setSelectedNode: actions.setSelectedNode,
            setSelectedLine: actions.setSelectedLine,
            deleteNode: actions.deleteNode,
            deleteLine: actions.deleteLine
        }
    });

    const [state, setState] = useState({
        startX: 0,
        startY: 0,
        scale: 0,
        scaleRate: 1,
        dragableItem: {}
    });

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    });

    useEffect(() => {
        actions.addNode({
            type: "startNode",
            height: 50,
            width: 50,
            label: "Start",
            x: 50,
            y: 50,
            id: 1
        });
        // eslint-disable-next-line
    }, []);

    const handleWheel = (e) => {
        const delta = state.scale + e.deltaY;
        const scaleRate = (props.height + delta) / props.height;

        setState({
            ...state,
            scale: delta,
            scaleRate: scaleRate,
            startX: e.pageX - e.pageX * scaleRate,
            startY: e.pageY - e.pageY * scaleRate
        });
    };

    const handleMouseMove = (e) => {
        if (state.dragableItem.cx) {
            const newcX = e.pageX * state.scaleRate;
            const newcY = e.pageY * state.scaleRate;
            const diffX = newcX - state.dragableItem.cx;
            const diffY = newcY - state.dragableItem.cy;
            let startX = state.startX;
            let startY = state.startY;
            let x = state.dragableItem.x;
            let y = state.dragableItem.y;

            if (state.dragableItem.node === true) {
                x = state.dragableItem.x + diffX;
                y = state.dragableItem.y + diffY;
            }

            if (state.dragableItem.canvas === true) {
                startX = state.startX + (state.dragableItem.cx - newcX);
                startY = state.startY + (state.dragableItem.cy - newcY);
            }

            if (state.dragableItem.node || state.dragableItem.anchor || state.dragableItem.canvas) {
                setState({
                    ...state,
                    dragableItem: {
                        ...state.dragableItem,
                        x1: state.dragableItem.x1 + diffX,
                        y1: state.dragableItem.y1 + diffY,
                        x: x,
                        y: y,
                        dragable: true,
                        cx: newcX,
                        cy: newcY
                    },
                    startX: startX,
                    startY: startY
                });
            }
        }
    }

    const handleMouseDown = (e, data) => {
        if (data.type !== "startNode") {
            actions.setSelectedNode(data.id);
        }

        setState({
            ...state,
            dragableItem: {
                ...data,
                dragable: false,
                cx: e.pageX * state.scaleRate,
                cy: e.pageY * state.scaleRate,
                node: true
            }
        });
    }

    const handleAnchorMouseDown = (e, { id, index, x, y }) => {
        setState({
            ...state,
            showNodeInAnchors: true,
            dragableItem: {
                id: id,
                index: index,
                dragable: false,
                cx: e.pageX * state.scaleRate,
                cy: e.pageY * state.scaleRate,
                x: x,
                y: y,
                x1: x,
                y1: y,
                anchor: true
            }
        });
    }

    const handleMouseUp = async (e, { id, index }) => {
        const { dragableItem } = state;

        await setState({
            ...state,
            dragableItem: {},
            showNodeInAnchors: false
        });

        if (dragableItem.anchor === true) {
            let edgeId;

            if (state.selectedLine) {
                edgeId = store.selectedLine;
            } else {
                edgeId = Object.keys(store.lines).length + 1;
            }

            actions.addLine({
                sourceId: dragableItem.id,
                sourceIndex: dragableItem.index,
                targetId: id,
                targetIndex: index,
                id: edgeId
            });
        };
    }

    const handleOverMouseDown = async (e) => {
        if (state.dragableItem.node) {
            handleOverMouseUp(e);
        } else {
            setState({
                ...state,
                dragableItem: {
                    dragable: false,
                    cx: e.pageX * state.scaleRate,
                    cy: e.pageY * state.scaleRate,
                    canvas: true
                },
            });

            actions.setSelectedNode(null);
        }
    }

    const handleOverMouseUp = async (e) => {
        await setState({ ...state, dragableItem: {}, showNodeInAnchors: false, });

        if (state.dragableItem.node) {
            actions.addNode({
                id: state.dragableItem.id,
                ...state.dragableItem
            });
        }
    }

    const handleDelItemClick = async (e) => {
        if (store.selectedLine) {
            actions.deleteLine(store.selectedLine);
        }
        if (store.selectedNode) {
            actions.deleteNode(store.selectedNode);
        }
    }

    const handleNewItemClick = (e) => {
        const id = Object.keys(store.nodes).length + 1;
        const node = config.nodes.stepNode;

        setState({
            ...state,
            dragableItem: {
                type: "stepNode",
                label: node.label,
                dragable: false,
                height: node.height,
                width: node.width,
                id: id,
                cx: e.pageX * state.scaleRate,
                cy: e.pageY * state.scaleRate,
                x: e.pageX * state.scaleRate - node.width / 2,
                y: e.pageY * state.scaleRate - node.height / 2,
                node: true
            }
        });
    }

    const handleLineMouseDown = (e, data) => {
        actions.setSelectedLine(data.id);
    }

    return (
        <Fragment>
            <FlowButton
                bottom={30}
                left={50}
                disabled={false}
                onClick={handleNewItemClick}
                type="primary"
                icon="plus" />
            <FlowButton
                bottom={30}
                right={330}
                disabled={!store.selectedNode && !store.selectedLine}
                onClick={handleDelItemClick}
                type="danger"
                icon="delete" />

            <svg
                width={props.width}
                height={props.height}
                onMouseDown={handleOverMouseDown}
                onMouseUp={handleOverMouseUp}
                className="designer"
                shapeRendering="geometricPrecision"
                viewBox={`${state.startX} ${state.startY} ${Number(props.height) + state.scale} ${Number(props.width) + state.scale}`}
                onWheel={handleWheel}>
                {Object.keys(store.lines).map((key, index) => {
                    const line = store.lines[key];

                    return (<JumpNode
                        key={index}
                        {...line}
                        selected={store.selectedLine === line.id}
                        onMouseDown={handleLineMouseDown} />
                    )
                })}
                {Object.keys(store.nodes).map((key, index) => {
                    const node = store.nodes[key];

                    return (
                        <StepNode
                            {...node}
                            key={index}
                            selected={node.id === store.selectedNode}
                            onMouseDown={handleMouseDown}
                            onAnchorMouseDown={handleAnchorMouseDown}
                            showInAnchors={state.showNodeInAnchors}
                            onAnchorMouseUp={handleMouseUp} />
                    )
                })}
                {(state.dragableItem.node && state.dragableItem.dragable) &&
                    <DragableNode {...state.dragableItem} />
                }
                {(state.dragableItem.anchor && state.dragableItem.dragable) &&
                    <DragableLine {...state.dragableItem} />
                }
            </svg>
        </Fragment>
    );
}

export default Designer;