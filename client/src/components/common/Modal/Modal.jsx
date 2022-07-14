import styles from "./Modal.module.css";
import classNames from "classnames";

const Modal = ({ active, setActive, children }) => {
	return (
		<div className={active ? classNames(styles.modal, styles.modalActive) : styles.modal} onClick={() => setActive(false)}>
			<div className={active ? classNames(styles.modalContent, styles.modalContentActive) : styles.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;