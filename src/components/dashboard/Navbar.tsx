"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/Button";
import { useSession } from "next-auth/react";
import DialogBox from "./DialogBox";
import { useSearch } from "../context/SearchContext";
import { Search } from 'lucide-react';
import { useSidebar } from "../context/SidebarContext";
import UserMenu from "./UserMenu";
import { signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session, status } = useSession();
    const { searchTerm, setSearchTerm, triggerSearch } = useSearch();
    const { setCurrentSection } = useSidebar();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="barstyling navbar">
            <div>
                <Link href="/app/dashboard" onClick={() => setCurrentSection("all")}><Image src="/branding/logo_temp.png" alt="Logo" className="logo" width={1000} height={1000} /></Link>
            </div>
            <div className="search">
                <label htmlFor="search-bar"></label>
                <input
                    id="search-bar"
                    type="text"
                    placeholder="Search for a project..."
                    className="searchbar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DefaultButton type="primary" onClick={triggerSearch}>
                    <Search />
                </DefaultButton>
            </div>
            <div className="rightside">
                <DialogBox title="Create a new Project" description="Give your Project a name" >New Project</DialogBox>
                <UserMenu onLogout={() => {
                    signOut({
                        callbackUrl: "/",
                    });
                }} /> {/* Pass Logout Function here */}
            </div>
        </nav>
    );
}
