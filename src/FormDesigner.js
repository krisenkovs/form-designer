import React, { Fragment, useState } from 'react';

//import { Modal } from 'semantic-ui-react';
import { Drawer, Modal } from 'antd';

import Designer from './components/Designer';

function FormDesigner() {
    const [modal, setModal] = useState(false);
    //const [propertyData, setPropertyData] = useState({});

    return (
        <Fragment>
            <Designer
                height="100%"
                width="100%"
                onItemDoubleClick={handleItemDoubleClick}
                onSelectItem={handleSelectItem}
            />
            {modal && <Modal
                title="Form settings"
                visible
                onOk={handleModalClose}
                onCancel={handleModalClose}
            >
                <p>Some contents...</p>
            </Modal>}
            <Drawer
                title="Node settings"
                placement="right"
                closable={false}
                visible
                mask={false}
            >
            </Drawer>
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
        //setPropertyData(data);
    }
}

export default FormDesigner;
