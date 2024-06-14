// components/RadioMenu.tsx
import { useState } from 'react';
import "@/resources/styling/components/interactives/radio.scss"

interface RadioMenuProps {
    label?: string;
    items: string[];
    name?: string;
}

const RadioMenu: React.FC<RadioMenuProps> = ({ label, items, name }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelection = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <div className="radio-menu">
            <p>{label}</p>
            {items.map((item, index) => (
                <label key={index} className="radio-item">
                    <input
                        type="radio"
                        name={name}
                        value={item}
                        checked={selectedItem === item}
                        onChange={() => handleSelection(item)}
                    />
                    {item}
                </label>
            ))}
        </div>
    );
};

export default RadioMenu;
