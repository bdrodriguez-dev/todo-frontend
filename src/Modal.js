import classes from './Modal.module.css';

const Modal = (props) => {
    return <div className={classes.modal}>
        <div className={classes.modalContent}>
            {props.children}
            <button onClick={props.handleHideModal}>Close</button>
        </div>
    </div>
};

export default Modal;