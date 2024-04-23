import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@/resources/styling/components/interactives/customModal.scss'

interface CustomModalProps {
    type: 'confirm' | 'input';
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (value?: any) => void; 
    message?: string;
    inputButtonName?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ type, isOpen, onClose, onConfirm, message, inputButtonName }) => {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    const handleInputConfirm = () => {
        if (type === 'input') {
            onConfirm(inputValue);
        }
        onClose();
    };

    const content = () => {
        if (type === 'confirm') {
            return (
                <>
                    <p>{message}</p>
                    <button className='warningButton' onClick={() => onConfirm()}>Yes</button>
                    <button onClick={onClose}>No</button>
                </>
            );
        } else if (type === 'input') {
            return (
                <>
                    <p>{message}</p>
                    <label htmlFor='modal-input'></label>
                    <input
                        id='modal-input'
                        type="text"
                        placeholder="New project name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleInputConfirm}>{inputButtonName}</button>
                    <button onClick={onClose}>Cancel</button>
                </>
            );
        }
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {content()}
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;
