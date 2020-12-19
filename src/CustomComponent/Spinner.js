import React from 'react';
import { Modal,Spinner } from 'react-bootstrap';

const Spinner1 = (props) => (
    <Modal
        style={{ marginTop:'15%',width:'2.5%',left:'50%' }}
        show={props.show}
        backdrop="static"
        keyboard={false}
    ><Spinner size="lg" animation="border" variant="primary" role="status" style={{ marginLeft:'1%' }}>
        <span className="sr-only">Loading...</span>
        </Spinner>
    </Modal>
)

export default Spinner1;