import classes from './Modal.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComp = (props) => (
    <Modal show={props.show} onHide={props.handleHideModal} centered size="lg">
        <Modal.Header><h2>{props.modalHeader}</h2></Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleHideModal}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default ModalComp;