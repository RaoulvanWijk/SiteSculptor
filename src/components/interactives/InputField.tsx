import { useState } from 'react';
import "@/resources/styling/components/interactives/InputField.scss"

interface InputFieldProps {
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="input-field">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputField;