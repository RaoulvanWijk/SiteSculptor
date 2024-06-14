'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/Button";
import { signOut, useSession } from "next-auth/react";
import { useSidebar } from "../context/SidebarContext";
import UserMenu from '../dashboard/UserMenu';
import { useRouter } from "next/navigation"
import SettingsNavbarItems from './SettingsNavbarItems';

export default function SettingsNavbar() {
    const router = useRouter();
    
    const { data: session, status } = useSession();
    const { setCurrentSection } = useSidebar();

    function toSettings() {
        router.push('/app/settings');
    }

    return (
        <nav className="barstyling navbar">
            <div className='leftside'>
                <Link
                    href="/app/dashboard"
                    onClick={() => setCurrentSection("all")}
                >
                    <Image
                        src="/branding/logo_temp.png"
                        alt="Logo"
                        className="logo"
                        width={1000}
                        height={1000}
                    />
                </Link>
            <SettingsNavbarItems />
            </div>
            <div className="rightside">
                
                <UserMenu
                    onLogout={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                    onSettings={() => {
                        toSettings();
                    }}
                />{" "}
            </div>
        </nav>
    )
}
