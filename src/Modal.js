import classes from './Modal.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComp = (props) => {
    // return <div className={classes.modal}>
    //     <h2>Create a new todo!</h2>
    //     <div className={classes.modalContent}>
    //         {props.children}
            
    //         <div className={classes.buttonRow}>
    //             <Button className={classes.createTask} variant="success" onClick={props.handleHideModal}>Create Todo!</Button>
    //             <Button className={classes.closeModal} variant="dark" onClick={props.handleHideModal}>Close</Button>
    //         </div>

    //     </div>
    // </div>

    return <Modal show={props.show} onHide={props.handleHideModal} centered size="lg">
        <Modal.Header><h2>Create a new todo!</h2></Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            <Button className={classes.createTask} variant="success" >Create Todo!</Button>
            <Button className={classes.closeModal} variant="secondary" onClick={props.handleHideModal}>Close</Button>
        </Modal.Footer>
    </Modal>;
};

export default ModalComp;