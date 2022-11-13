import Button from "./Button"
import classNames from "classnames"
import ReactModal from "react-modal"
import resolvedStyles from "./Modal.scss?type=resolve"
import styles from "./Modal.scss"
import { MouseEventHandler, ReactNode } from "react"

ReactModal.setAppElement("#__next")

interface ModalProps extends ReactModal.Props {
  alert?: boolean,
  icon: ReactNode,
  title: string,
  onOK: MouseEventHandler
}

const Modal = (props: ModalProps) => (
  <ReactModal {...props} className={classNames(resolvedStyles.className, "modal")}
      overlayClassName={classNames(resolvedStyles.className, "modal-overlay")}>
    <div className={classNames("modal-top-area", { alert: props.alert })}>
      <div className="modal-icon">{props.icon}</div>
      <div className="modal-title">{props.title}</div>
      {props.children}
    </div>
    <div className="modal-button-area">
      <Button onClick={props.onOK}>OK</Button>
    </div>
    {resolvedStyles.styles}
    <style jsx>{styles}</style>
  </ReactModal>
)

export default Modal
