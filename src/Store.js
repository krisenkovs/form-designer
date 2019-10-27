import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
    nodes: {},
    lines: {},
    selectedNode: null,
    selectedLine: null
};

const actions = {
    addNode: (store, node) => {
        let newNodes = { ...store.state.nodes };

        newNodes[node.id] = { ...node };
        store.setState({ nodes: newNodes });
    },

    addLine: (store, line) => {
        let newLines = { ...store.state.lines };

        newLines[line.id] = line;
        store.setState({ lines: newLines });
    },

    setSelectedNode: (store, id) => {
        store.setState({ selectedNode: id, selectedLine: null });
    },

    setSelectedLine: (store, id) => {
        store.setState({ selectedLine: id, selectedNode: null });
    },

    deleteNode: (store, id) => {
        const newLines = { ...store.state.lines };

        Object.keys(store.state.lines).map(key => {
            const line = { ...store.state.lines[key] }

            if (line.sourceId === id || line.targetId === id) {
                delete newLines[line.id];
            }

            return null;
        });

        const newNodes = { ...store.state.nodes };

        delete newNodes[id];

        store.setState({ nodes: newNodes, lines: newLines, selectedNode: null });
    },

    deleteLine: (store, id) => {
        const newLines = { ...store.state.lines };

        delete newLines[id]

        store.setState({ lines: newLines, selectedLine: null });
    }
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;