const config = {
    nodes: {
        startNode: {
            visibleOnPanel: false,
            type: "StartNode",
            settings: {
                width: 50,
                height: 50,
                radius: 25,
                color: "#78b184",
                label: "start",
                panelShape: "circle",
                anchors: [
                    {
                        index: 0,
                        x: 25,
                        y: 0,
                        direction: "top"
                    },
                    {
                        index: 1,
                        x: 50,
                        y: 25,
                        direction: "right"
                    },
                    {
                        index: 2,
                        x: 25,
                        y: 50,
                        direction: "bottom"
                    },
                    {
                        index: 3,
                        x: 0,
                        y: 25,
                        direction: "left"
                    },
                ]
            }
        },
        stepNode: {
            visibleOnPanel: true,
            type: "StepNode",
            settings: {
                width: 50,
                height: 50,
                radius: 25,
                color: "#f9ab40",
                label: "step",
                panelShape: "circle",
                anchors: [
                    {
                        index: 0,
                        x: 25,
                        y: 0,
                        direction: "top"
                    },
                    {
                        index: 1,
                        x: 50,
                        y: 25,
                        direction: "right"
                    },
                    {
                        index: 2,
                        x: 25,
                        y: 50,
                        direction: "bottom"
                    },
                    {
                        index: 3,
                        x: 0,
                        y: 25,
                        direction: "left"
                    },
                ]
            }
        },
        formNode: {
            visibleOnPanel: true,
            type: "FormNode",
            settings: {
                width: 50,
                height: 40,
                radius: 2,
                color: "#7a88a7",
                label: "form",
                panelShape: "rectangle",
                anchors: [
                    {
                        index: 0,
                        x: 25,
                        y: 0,
                        direction: "top"
                    },
                    {
                        index: 1,
                        x: 50,
                        y: 20,
                        direction: "right"
                    },
                    {
                        index: 2,
                        x: 25,
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
            }
        }
    },
    connectors: {
        stepConnector: {
            line: ""
        },
        formConnector: {
            line: ""
        }
    }
}

export default config;