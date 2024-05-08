import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@/resources/styling/components/interactives/customModal.scss'
import DefaultButton from './Button';

interface CustomModalProps {
    type: 'confirm' | 'input' | 'options';
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
                    <DefaultButton type='toggleWarning' onClick={() => onConfirm()}>Yes</DefaultButton>
                    <DefaultButton type='toggle' onClick={onClose}>No</DefaultButton>
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
                    <DefaultButton type='toggle' onClick={handleInputConfirm}>{inputButtonName}</DefaultButton>
                    <DefaultButton type='toggle' onClick={onClose}>Cancel</DefaultButton>
                </>
            );
        } else if (type === 'options') {
            return (
                <div className='modal-options'>
                    <p>{message}</p>
                    <DefaultButton type='toggle'>Rename</DefaultButton>
                    <DefaultButton type='toggleWarning'>Delete</DefaultButton>
                    <DefaultButton type='toggle' onClick={onClose}>Cancel</DefaultButton>
                </div>
            )
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
