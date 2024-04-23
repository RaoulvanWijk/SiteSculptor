import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import '@/resources/styling/components/interactives/userMenu.scss'
import DefaultButton from '../interactives/Button';
import { LogOut, Settings } from 'lucide-react';

type UserMenuProps = {
    onLogout?: () => void;
}

const UserMenu = ({ onLogout }: UserMenuProps) => {
    const { data: session } = useSession();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`dropdown ${isDropdownOpen ? 'visible' : ''}`}>
            <Image
                src={session?.user.image || "/logo.svg"}
                alt="user logo"
                width={100} height={100}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
                <div className="dropdown-content">
                    <div className="user-info">
                        <Image src={session?.user.image || "/logo.svg"} alt="user logo" className='um-logo' width={200} height={200} />
                        <span className='um-name'>{session?.user.name}</span>
                        <span className='um-email'>{session?.user.email}</span>
                    </div>
                    <div className="um-actions">
                        <DefaultButton type="toggleLink" onClick={onLogout}>Logout <LogOut size={15} /></DefaultButton>
                        <DefaultButton type="toggleLink" onClick={() => console.log('Changing settings...')}>Settings <Settings size={15} /></DefaultButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;