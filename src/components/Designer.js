import React, { Component, Fragment } from 'react';

import StepNode from './StepNode';
import JumpNode from './JumpNode';
import DragableNode from './DragableNode';
import DragableLine from './DragableLine';
import ItemPanel from './ItemsPanel';

class Designer extends Component {
    state = {
        nodes: [{
            x: 80, y: 60, id: 1, width: 40,
            height: 40,
            radius: 40,
            label: "start",
            color: "#78b184",
            anchors: [
                {
                    index: 0,
                    x: 20,
                    y: 0,
                    direction: "top"
                },
                {
                    index: 1,
                    x: 40,
                    y: 20,
                    direction: "right"
                },
                {
                    index: 2,
                    x: 20,
                    y: 40,
                    direction: "bottom"
                },
                {
                    index: 3,
                    x: 0,
                    y: 20,
                    direction: "left"
                },
            ]
        }],
        edges: [],
        selectedNode: null,
        dragableItem: null
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
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
                                let anchor = item.anchors[edge.targetIndex]
                                x1 = item.x + anchor.x;
                                y1 = item.y + anchor.y;
                                targetDirection = anchor.direction;
                            }

                            if (item.id === edge.sourceId) {
                                let anchor = item.anchors[edge.sourceIndex]
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
                            selected={this.state.selectedNode && node.id === this.state.selectedNode.id}
                            onMouseDown={this.handleMouseDown}
                            onAnchorMouseDown={this.handleMouseDown}
                            onAnchorMouseUp={this.handleMouseUp}
                        />
                    )}
                    {(this.state.dragableItem && this.state.dragableItem.type === "StepNode" && this.state.dragableItem.dragable) &&
                        <DragableNode
                            {...this.state.dragableItem}
                        />
                    }

                    {(this.state.dragableItem && this.state.dragableItem.type === "Anchor" && this.state.dragableItem.dragable) &&
                        <DragableLine
                            {...this.state.dragableItem}
                        />
                    }
                </svg>
            </Fragment>
        );
    }

    handleMouseMove = (e) => {
        if (this.state.dragableItem) {
            const diffX = Math.trunc((e.pageX - this.state.dragableItem.cx) / 5);
            const diffY = Math.trunc((e.pageY - this.state.dragableItem.cy) / 5);


            if (diffX === 0 && diffY === 0) {
                return;
            }

            const newcX = this.state.dragableItem.cx + diffX * 5
            const newcY = this.state.dragableItem.cy + diffY * 5

            if (this.state.dragableItem.type === "StepNode") {
                const newX = this.state.dragableItem.x + diffX * 5;
                const newY = this.state.dragableItem.y + diffY * 5;

                this.setState({ dragableItem: { ...this.state.dragableItem, x: newX, y: newY, dragable: true, cx: newcX, cy: newcY } });
            }

            if (this.state.dragableItem.type === "Anchor") {
                const newX = this.state.dragableItem.x1 + diffX * 5;
                const newY = this.state.dragableItem.y1 + diffY * 5;

                this.setState({ dragableItem: { ...this.state.dragableItem, x1: newX, y1: newY, dragable: true, cx: newcX, cy: newcY } })
            }
        }
    }

    handleMouseDown = (e, data) => {
        this.setState({ selectedNode: data, dragableItem: { ...data, dragable: false, cx: e.pageX, cy: e.pageY }, state: "" });
    }

    handleMouseUp = (e, data) => {
        const newEdges = [...this.state.edges];
        if (data.type === "Anchor") {
            newEdges.push({ sourceId: this.state.selectedNode.id, sourceIndex: this.state.selectedNode.index, targetId: data.id, targetIndex: data.index })
        }
        this.setState({ edges: newEdges, dragableItem: null, setSelectedNode: data })
    }

    handleOverMouseDown = (e) => {
        if (this.state.dragableItem) {
            this.handleOverMouseUp(e);
        } else {
            this.setState({ selectedNode: null })
        }


    }

    handleOverMouseUp = (e) => {
        if (this.state.dragableItem && this.state.dragableItem.type === "StepNode") {
            let newData = [...this.state.nodes];
            let id = this.state.dragableItem.id;

            if (!id) {
                id = newData.length + 1
                newData.push({ ...this.state.dragableItem, id: id });
            }

            newData.forEach(node => {
                if (node.id === id) {
                    node.x = this.state.dragableItem.x;
                    node.y = this.state.dragableItem.y;
                }
            });

            this.setState({ nodes: newData });
        }

        this.setState({ dragableItem: null });
    }

}

export default Designer;