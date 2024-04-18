import React from 'react';
import ReactDOM from 'react-dom';
import '@/resources/styling/components/interactives/confirmationModal.scss'

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
    option1?: string;
    option2?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message, option1, option2 }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm}>{option1}</button>
                <button onClick={onClose}>{option2}</button>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;