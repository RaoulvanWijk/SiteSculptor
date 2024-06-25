// components/RadioMenu.tsx
import { useState, useEffect } from 'react';
import "@/resources/styling/components/interactives/radio.scss"

interface RadioMenuProps {
    label?: string;
    items: string[];
    name?: string;
    defaultSelectedItem?: string;
    themeSetter?: (item: string) => void;
}

const RadioMenu: React.FC<RadioMenuProps> = ({ label, items, name, defaultSelectedItem, themeSetter }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelection = (item: string) => {
        setSelectedItem(item);
        if (themeSetter) {
            themeSetter(item);
        }
    };

    useEffect(() => {
        if (defaultSelectedItem !== undefined) {
            setSelectedItem(defaultSelectedItem);
        }
    }, [defaultSelectedItem]);

    return (
        <div className="radio-menu">
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
