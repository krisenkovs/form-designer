import React, { Component, Fragment } from 'react';

import StepNode from './StepNode';
import JumpNode from './JumpNode';
import DragableNode from './DragableNode';
import DragableLine from './DragableLine';
import ItemPanel from './ItemsPanel';

import config from './itemsConfig'

class Designer extends Component {
    state = {
        nodes: [],
        edges: [],
        selectedNode: {},
        dragableItem: {}
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);

        let startNode = { ...config.nodes.startNode };

        startNode.id = 1;
        startNode.x = 150;
        startNode.y = 70;

        this.setState({ nodes: [startNode] })
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        return (
            <Fragment>
                <ItemPanel onItemClick={this.handleMouseDown} />
                <svg
                    width={this.props.width}
                    height={this.props.height}
                    onMouseDown={this.handleOverMouseDown}
                    onMouseUp={this.handleOverMouseUp}
                    className="designer"
                    shapeRendering="geometricPrecision"
                >
                    {this.state.edges.map((edge, index) => {
                        let x, y, x1, y1, targetDirection, sourceDirection;

                        this.state.nodes.map(item => {
                            if (item.id === edge.targetId) {
                                let anchor = item.anchors[edge.targetIndex];

                                x1 = item.x + anchor.x;
                                y1 = item.y + anchor.y;
                                targetDirection = anchor.direction;
                            }

                            if (item.id === edge.sourceId) {
                                let anchor = item.anchors[edge.sourceIndex];

                                x = item.x + anchor.x;
                                y = item.y + anchor.y;
                                sourceDirection = anchor.direction;
                            }
                            return null;
                        })

                        return (<JumpNode
                            x={x}
                            y={y}
                            x1={x1}
                            y1={y1}
                            targetDirection={targetDirection}
                            sourceDirection={sourceDirection}
                            key={index}
                        />)
                    })}
                    {this.state.nodes.map((node, index) =>
                        <StepNode
                            {...node}
                            key={index}
                            selected={node.id === this.state.selectedNode.id}
                            onMouseDown={this.handleMouseDown}
                            onAnchorMouseDown={this.handleAnchorMouseDown}
                            onAnchorMouseUp={this.handleMouseUp}
                            onItemDoubleClick={this.props.onItemDoubleClick}
                            dragAnchor={this.state.dragableItem.anchor}
                            dragItemType={this.state.dragableItem.nodeType}
                        />
                    )}
                    {(this.state.dragableItem.node && this.state.dragableItem.dragable) &&
                        <DragableNode
                            {...this.state.dragableItem}
                        />
                    }

                    {(this.state.dragableItem.anchor && this.state.dragableItem.dragable) &&
                        <DragableLine
                            {...this.state.dragableItem}
                        />
                    }
                </svg>
            </Fragment>
        );
    }

    handleMouseMove = (e) => {
        if (this.state.dragableItem.cx) {
            const diffX = Math.trunc((e.pageX - this.state.dragableItem.cx) / 5);
            const diffY = Math.trunc((e.pageY - this.state.dragableItem.cy) / 5);

            if (diffX === 0 && diffY === 0) {
                return;
            }

            const { dragableItem } = this.state;
            const newcX = dragableItem.cx + diffX * 5
            const newcY = dragableItem.cy + diffY * 5

            if (dragableItem.node === true) {
                const newX = dragableItem.x + diffX * 5;
                const newY = dragableItem.y + diffY * 5;

                this.setState({
                    dragableItem: {
                        ...dragableItem,
                        x: newX,
                        y: newY,
                        dragable: true,
                        cx: newcX,
                        cy: newcY
                    }
                });
            }

            if (dragableItem.anchor === true) {
                const newX = dragableItem.x1 + diffX * 5;
                const newY = dragableItem.y1 + diffY * 5;

                this.setState({
                    dragableItem: {
                        ...dragableItem,
                        x1: newX,
                        y1: newY,
                        dragable: true,
                        cx: newcX,
                        cy: newcY
                    }
                })
            }
        }
    }

    handleMouseDown = (e, data) => {
        this.setState({
            selectedNode: data,
            dragableItem: {
                ...data,
                dragable: false,
                cx: e.pageX,
                cy: e.pageY,
                node: true
            }
        });

        this.props.onSelectItem && this.props.onSelectItem(data);
    }

    handleAnchorMouseDown = (e, data) => {
        this.setState({
            selectedNode: data,
            dragableItem: {
                ...data,
                dragable: false,
                cx: e.pageX,
                cy: e.pageY,
                anchor: true
            }
        });
    }

    handleMouseUp = async (e, data) => {
        const newEdges = [...this.state.edges];
        const { selectedNode } = this.state;

        if (data.anchor === true) {
            newEdges.push({
                sourceId: selectedNode.id,
                sourceIndex: selectedNode.index,
                targetId: data.id,
                targetIndex: data.index
            });
        };

        this.setState({
            edges: newEdges,
            dragableItem: {},
            selectedNode: data
        });

    }

    handleOverMouseDown = (e) => {
        if (this.state.dragableItem.nodeType) {
            this.handleOverMouseUp(e);
        } else {
            this.setState({ selectedNode: {} });
            this.props.onSelectItem && this.props.onSelectItem({});
        }
    }

    handleOverMouseUp = (e) => {
        const { dragableItem, nodes } = this.state;

        if (dragableItem.node) {
            let newData = [...nodes];
            let id = dragableItem.id;

            if (!id) {
                id = newData.length + 1
                newData.push({ ...dragableItem, id: id });
            }

            newData.forEach(node => {
                if (node.id === id) {
                    node.x = dragableItem.x;
                    node.y = dragableItem.y;
                }
            });
            this.setState({ nodes: newData });
        }
        this.setState({ dragableItem: {} });
    }

}

export default Designer;