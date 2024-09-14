import { FC, ReactElement } from "react";
import Modal from "@mui/material/Modal";
import styles from "./CustomModal.module.scss";

interface ModalProps {
  open: boolean;
  children: ReactElement;
}
const CustomModal: FC<ModalProps> = ({ open, children }) => {
  return (
    <Modal open={open} className={styles.modal}>
      {children}
    </Modal>
  );
};

export default CustomModal;
