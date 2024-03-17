import React from "react";
import "./ModalNotification-style.css";

function ModalNotification({
  modalIcon,
  modalText,
  modalActions,
  cancelAction,
}) {
  console.log(modalActions);
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="icon-box">
          <i className={modalIcon}></i>
        </div>
        <div className="content-box">
          <p>{modalText}</p>
        </div>
        <div className="action-box">
          {modalActions.map((action) => (
            <button onClick={action.action}>{action.label}</button>
          ))}
        </div>
      </div>
      <i className="fa-solid fa-circle-xmark" onClick={cancelAction}></i>
    </div>
  );
}

export default ModalNotification;
