"use client";

import Link from "next/link";
import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/Button";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="barstyling navbar">
            <div>
                <Link href="/app/dashboard"><img src="/branding/logo_temp.png" alt="Logo" className="logo"/></Link>
            </div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Project..."
                    className="searchbar"
                />
                <DefaultButton type="primary">
                    Search
                </DefaultButton>
            </div>
            <div className="rightside">
                <DefaultButton type="primary">
                    New Project
                </DefaultButton>
                <a>
                    <img
                        src={
                            session
                                ? session.user.image || "/logo.svg"
                                : "/logo.svg"
                        }
                        alt="logo"
                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                    />
                </a>
            </div>
        </nav>
    );
}
