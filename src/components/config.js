export default {
    nodes: {
        startNode: {
            type: "startNode",
            width: 50,
            height: 50,
            radius: 25,
            color: "#78b184",
            label: "Start",
            anchors: [
                {
                    x: 25,
                    y: 0,
                    direction: "top",
                    in: false,
                    out: true
                },
                {
                    x: 50,
                    y: 25,
                    direction: "right",
                    in: false,
                    out: true
                },
                {
                    x: 25,
                    y: 50,
                    direction: "bottom",
                    in: false,
                    out: true
                },
                {
                    x: 0,
                    y: 25,
                    direction: "left",
                    in: false,
                    out: true
                },
            ]
        },
        stepNode: {
            type: "stepNode",
            width: 50,
            height: 50,
            radius: 25,
            color: "#f9ab40",
            label: "Step",
            anchors: [
                {
                    index: 0,
                    x: 25,
                    y: 0,
                    direction: "top",
                    in: true,
                    out: true
                },
                {
                    x: 50,
                    y: 25,
                    direction: "right",
                    in: true,
                    out: true
                },
                {
                    x: 25,
                    y: 50,
                    direction: "bottom",
                    in: true,
                    out: true
                },
                {
                    x: 0,
                    y: 25,
                    direction: "left",
                    in: true,
                    out: true
                },
            ]
        }
    }
}