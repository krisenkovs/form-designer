import React, { Fragment, useState } from 'react';

import { Modal, Button, Segment, Header, Message } from 'semantic-ui-react';

import Designer from './components/Designer';

function FormDesigner() {
    const [modal, setModal] = useState(false);
    const [propertyData, setPropertyData] = useState({});

    return (
        <Fragment>
            <Designer
                height="100%"
                width="100%"
                onItemDoubleClick={handleItemDoubleClick}
                onSelectItem={handleSelectItem}
            />
            {modal && <Modal
                open
            >
                <Modal.Header>Form settings</Modal.Header>
                <Modal.Content>
                    <p>Some settings</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='close' content='Close' onClick={handleModalClose} />
                </Modal.Actions>
            </Modal>}
            {propertyData.id &&
                <Segment style={{ position: "absolute", top: "50px", right: "50px", width: "200px", height: "500px" }}>
                    <Header as='h3'>Settings</Header>
                </Segment>
            }
        </Fragment>
    );

    function handleItemDoubleClick(e, data) {
        if (data.nodeType === "FormNode") {
            setModal(true);
        }
    }

    function handleModalClose(e) {
        setModal(false)
    }

    function handleSelectItem(data) {
        console.log(data)
        setPropertyData(data);
    }
}

export default FormDesigner;
