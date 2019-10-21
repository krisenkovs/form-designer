const config = {
    nodes: {
        startNode: {
            visibleOnPanel: false,
            type: "Node",
            nodeType: "StartNode",
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
                    direction: "top",
                    in: [],
                    out: ["StepNode"]
                },
                {
                    index: 1,
                    x: 50,
                    y: 25,
                    direction: "right",
                    in: [],
                    out: ["StepNode"]
                },
                {
                    index: 2,
                    x: 25,
                    y: 50,
                    direction: "bottom",
                    in: [],
                    out: ["StepNode"]
                },
                {
                    index: 3,
                    x: 0,
                    y: 25,
                    direction: "left",
                    in: [],
                    out: ["StepNode"]
                },
            ]

        },
        stepNode: {
            visibleOnPanel: true,
            nodeType: "StepNode",
            type: "Node",
            width: 50,
            height: 50,
            radius: 25,
            color: "#f9ab40",
            label: "Step",
            icon: "circle outline",
            panelShape: "circle",
            anchors: [
                {
                    index: 0,
                    x: 25,
                    y: 0,
                    direction: "top",
                    in: ["StartNode", "StepNode"],
                    out: ["StepNode", "FormNode"]
                },
                {
                    index: 1,
                    x: 50,
                    y: 25,
                    direction: "right",
                    in: ["StartNode", "StepNode"],
                    out: ["StepNode", "FormNode"]
                },
                {
                    index: 2,
                    x: 25,
                    y: 50,
                    direction: "bottom",
                    in: ["StartNode", "StepNode"],
                    out: ["StepNode", "FormNode"]
                },
                {
                    index: 3,
                    x: 0,
                    y: 25,
                    direction: "left",
                    in: ["StartNode", "StepNode"],
                    out: ["StepNode", "FormNode"]
                },
            ]

        },
        formNode: {
            visibleOnPanel: true,
            nodeType: "FormNode",
            type: "Node",
            width: 50,
            height: 40,
            radius: 2,
            color: "#7a88a7",
            label: "Form",
            icon: "stop",
            panelShape: "rectangle",
            anchors: [
                {
                    index: 0,
                    x: 25,
                    y: 0,
                    direction: "top",
                    in: ["StepNode"],
                    out: []

                },
                {
                    index: 1,
                    x: 50,
                    y: 20,
                    direction: "right",
                    in: ["StepNode"],
                    out: []
                },
                {
                    index: 2,
                    x: 25,
                    y: 40,
                    direction: "bottom",
                    in: ["StepNode"],
                    out: []
                },
                {
                    index: 3,
                    x: 0,
                    y: 20,
                    direction: "left",
                    in: ["StepNode"],
                    out: []
                },
            ]
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