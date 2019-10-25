import React, { Component, Fragment } from 'react';

import StepNode from './StepNode';
import JumpNode from './JumpNode';
import DragableNode from './DragableNode';
import DragableLine from './DragableLine';
import ItemPanel from './ItemsPanel';

import config from './itemsConfig'

class Designer extends Component {
    state = {
        nodes: {},
        edges: {},
        selectedNode: {},
        dragableItem: {},
        visibleAnchors: [],
        scale: 0,
        scaleRate: 1,
        startX: 0,
        startY: 0
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);

        let startNode = { ...config.nodes.startNode };

        startNode.id = 1;
        startNode.x = 150;
        startNode.y = 70;

        this.setState({ nodes: { 1: startNode } });
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        return (
            <Fragment>
                <ItemPanel onItemClick={this.handleNewItemClick} />
                <svg
                    width={this.props.width}
                    height={this.props.height}
                    onMouseDown={this.handleOverMouseDown}
                    onMouseUp={this.handleOverMouseUp}
                    className="designer"
                    shapeRendering="geometricPrecision"
                    viewBox={`${this.state.startX} ${this.state.startY} ${Number(this.props.height) + this.state.scale} ${Number(this.props.width) + this.state.scale}`}
                    onWheel={this.handleWheel}
                >
                    {Object.keys(this.state.edges).map((key, index) => {
                        const edge = this.state.edges[key];
                        let x, y, x1, y1, targetDirection, sourceDirection, anchor;

                        anchor = this.state.nodes[edge.targetId].anchors[edge.targetIndex];
                        x1 = this.state.nodes[edge.targetId].x + anchor.x;
                        y1 = this.state.nodes[edge.targetId].y + anchor.y;
                        targetDirection = anchor.direction;

                        anchor = this.state.nodes[edge.sourceId].anchors[edge.sourceIndex];
                        x = this.state.nodes[edge.sourceId].x + anchor.x;
                        y = this.state.nodes[edge.sourceId].y + anchor.y;
                        sourceDirection = anchor.direction;

                        return (<JumpNode
                            x={x}
                            y={y}
                            x1={x1}
                            y1={y1}
                            targetDirection={targetDirection}
                            sourceDirection={sourceDirection}
                            key={index}
                            id={edge.id}
                            {...edge}
                            selected={this.state.selectedLine === edge.id}
                            onMouseDown={this.handleLineMouseDown}
                        />)
                    })}
                    {Object.keys(this.state.nodes).map((key, index) => {
                        const node = this.state.nodes[key];

                        return (
                            <StepNode
                                {...node}
                                key={index}
                                selected={node.id === this.state.selectedNode}
                                onMouseDown={this.handleMouseDown}
                                onAnchorMouseDown={this.handleAnchorMouseDown}
                                onAnchorMouseUp={this.handleMouseUp}
                                onItemDoubleClick={this.props.onItemDoubleClick}
                                visibleAnchors={this.state.visibleAnchors}
                                dragAnchor={this.state.dragableItem.anchor}
                                dragItemType={this.state.dragableItem.nodeType}
                            />
                        )
                    })}
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

    handleWheel = (e) => {
        const delta = this.state.scale + e.deltaY;
        const scaleRate = (Number(this.props.height) + delta) / Number(this.props.height);

        this.setState({ scale: delta, scaleRate: scaleRate, startX: e.pageX - e.pageX * scaleRate, startY: e.pageY - e.pageY * scaleRate });
    }

    handleMouseMove = (e) => {
        const { dragableItem } = this.state;

        if (dragableItem.cx) {
            const diffX = Math.trunc((e.pageX * this.state.scaleRate - dragableItem.cx) / 5);
            const diffY = Math.trunc((e.pageY * this.state.scaleRate - dragableItem.cy) / 5);

            if (diffX === 0 && diffY === 0) {
                return;
            }

            let newcX = dragableItem.cx + diffX * 5
            let newcY = dragableItem.cy + diffY * 5

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

            if (dragableItem.canvas === true) {
                newcX = e.pageX * this.state.scaleRate;
                newcY = e.pageY * this.state.scaleRate;
                const startX = this.state.startX + (dragableItem.cx - newcX);
                const startY = this.state.startY + (dragableItem.cy - newcY);

                this.setState({
                    dragableItem: {
                        ...dragableItem,
                        dragable: true,
                        cx: newcX,
                        cy: newcY
                    },
                    startX: startX,
                    startY: startY
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

    handleNewItemClick = (e, data) => {
        const id = Object.keys(this.state.nodes).length + 1;

        this.setState({
            dragableItem: {
                ...data,
                dragable: false,
                id: id,
                cx: e.pageX * this.state.scaleRate,
                cy: e.pageY * this.state.scaleRate,
                x: e.pageX * this.state.scaleRate - data.width / 2,
                y: e.pageY * this.state.scaleRate - data.height / 2,
                node: true
            }
        }, () => console.log(this.state));
    }

    handleMouseDown = (e, data) => {
        let anchors = [];

        anchors = this._showAnchors(anchors, data.id, null, null, "All");

        this.setState({
            selectedNode: data.id,
            selectedLine: null,
            dragableItem: {
                ...data,
                dragable: false,
                cx: e.pageX * this.state.scaleRate,
                cy: e.pageY * this.state.scaleRate,
                node: true
            },
            visibleAnchors: anchors
        });

        this.props.onSelectItem && this.props.onSelectItem(data);
    }

    handleAnchorMouseDown = (e, { id, index, x, y }) => {
        let anchors = [];
        const { nodes, edges } = this.state;

        let sX, sY, eX, eY, cX, cY, lId, lIndex, sNode;

        sX = x;
        sY = y;
        eX = x;
        eY = y;
        cX = e.pageX * this.state.scaleRate;
        cY = e.pageY * this.state.scaleRate;
        lId = id;
        lIndex = index;
        sNode = id

        anchors = this._showAnchors(anchors, null, null, nodes[id].nodeType, null);

        if (this.state.selectedLine) {
            const edge = edges[this.state.selectedLine];

            if (id === edge.targetId) {
                anchors = this._showAnchors([], null, null, nodes[edge.sourceId].nodeType, null);

                sX = nodes[edge.sourceId].anchors[edge.sourceIndex].x + nodes[edge.sourceId].x;
                sY = nodes[edge.sourceId].anchors[edge.sourceIndex].y + nodes[edge.sourceId].y;
                lId = edge.sourceId;
                lIndex = edge.sourceIndex;
            }

            sNode = null;
        }

        this.setState({
            selectedNode: sNode,
            dragableItem: {
                id: lId,
                index: lIndex,
                dragable: false,
                cx: cX,
                cy: cY,
                x: sX,
                y: sY,
                x1: eX,
                y1: eY,
                anchor: true
            },
            visibleAnchors: anchors
        });
    }

    handleLineMouseDown = (e, data) => {
        let anchors = [];

        anchors = this._showAnchors(anchors, data.targetId, data.targetIndex, null, null);

        this.setState({
            selectedLine: data.id,
            visibleAnchors: anchors,
            selectedNode: null
        });
    }

    _showAnchors = (nodes, nodeId, index, inType, outType) => {
        for (let key in this.state.nodes) {
            const node = this.state.nodes[key];

            if (!nodeId || String(key) === String(nodeId)) {
                node.anchors.forEach((anchor, anchorIndex) => {
                    if (String(index) === String(anchorIndex)) {
                        nodes.push(`${key}:${anchorIndex}`);
                        return;
                    }

                    if ((inType === "All" && anchor.in.length > 0) || anchor.in.indexOf(inType) !== -1) {
                        nodes.push(`${key}:${anchorIndex}`);
                        return;
                    }

                    if ((outType === "All" && anchor.out.length > 0) || anchor.out.indexOf(outType) !== -1) {
                        nodes.push(`${key}:${anchorIndex}`);
                        return;
                    }
                })
            }
        }

        return nodes;
    }

    handleMouseUp = (e, { id, index }) => {
        const { dragableItem } = this.state;
        let edges = { ...this.state.edges }
        let nodes = [];

        if (this.state.selectedNode) {
            nodes = this._showAnchors(nodes, dragableItem.id, null, null, "All");
        }

        if (this.state.selectedLine) {
            nodes = this._showAnchors(nodes, id, index, null, null);
        }

        if (dragableItem.anchor === true) {
            let edgeId;

            if (this.state.selectedLine) {
                edgeId = this.state.selectedLine
            } else {
                edgeId = Object.keys(this.state.edges).length + 1;
            }

            edges[edgeId] = {
                sourceId: dragableItem.id,
                sourceIndex: dragableItem.index,
                targetId: id,
                targetIndex: index,
                id: edgeId
            };
        };

        this.setState({
            edges: edges,
            dragableItem: {},
            visibleAnchors: nodes
        });
    }

    handleOverMouseDown = (e) => {
        if (this.state.dragableItem.node) {
            this.handleOverMouseUp(e);
        } else {
            this.setState({
                dragableItem: {
                    dragable: false,
                    cx: e.pageX * this.state.scaleRate,
                    cy: e.pageY * this.state.scaleRate,
                    canvas: true
                },
                selectedNode: null,
                selectedLine: null,
                visibleAnchors: []
            });
            //this.setState({ selectedNode: null, selectedLine: null, visibleAnchors: [] });
            this.props.onSelectItem && this.props.onSelectItem({});
        }
    }

    handleOverMouseUp = (e) => {
        const { dragableItem, selectedNode } = this.state;
        let nodes = { ...this.state.nodes }
        let anchors = this.state.visibleAnchors;

        if (selectedNode) {
            anchors = this._showAnchors([], selectedNode, null, null, "All");
        }

        if (dragableItem.node) {
            let id = dragableItem.id;

            if (!nodes[id]) {
                nodes[id] = dragableItem;
            }

            nodes[id].x = dragableItem.x;
            nodes[id].y = dragableItem.y;
        }
        this.setState({ dragableItem: {}, visibleAnchors: anchors, nodes: nodes });
    }
}

export default Designer;