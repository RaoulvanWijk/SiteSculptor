import { useState } from 'react';
import "@/resources/styling/components/interactives/dropdown.scss"

interface DropdownProps {
    label?: string;
    items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label || "English (US)");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
                {label}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {items.map((item, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleItemClick(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
