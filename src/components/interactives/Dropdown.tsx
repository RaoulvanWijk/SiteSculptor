import { useState, useEffect } from 'react';
import "@/resources/styling/components/interactives/dropdown.scss"

interface DropdownProps {
    label?: string;
    items: string[];
    defaultSelected?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, defaultSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label || "Option");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    useEffect(() => {
        if (defaultSelected !== undefined) {
            setSelectedItem(defaultSelected);
        }
    }, [defaultSelected]);

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
                {selectedItem}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {items.map((item, index:number) => (
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
