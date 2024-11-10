import React from 'react';
import style from '../styles/ConfirmationPopup.module.css';

const ConfirmationPopup = ({ isOpen, message, onConfirm, onCancel }) => {//popup component for deletion conformation.
 
    if (!isOpen) return null; //so it wont be visible till smtn trigers to change its visibilty by changing the popup state in myproperty card. 

  return (
    <div className={style.overlay}>
      <div className={style.popup}>
        <h2>Confirmation</h2>
        <p>{message}</p>
        <div className={style.buttonContainer}>
          <button className={style.confirmButton} onClick={onConfirm}>Confirm</button>
          <button className={style.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;