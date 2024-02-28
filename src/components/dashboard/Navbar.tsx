"use client";

import Link from "next/link";
import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/DefaultButton";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="barstyling navbar">
            <div>
                <h1>Logo</h1>
            </div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Project..."
                    className="searchbar"
                />
                <DefaultButton buttonName="search" type="primary" />
            </div>
            <div className="rightside">
                <DefaultButton buttonName="new project +" type="primary" />
                <a>
                    <img
                        src={
                            session
                                ? session.user.image || "/logo.svg"
                                : "/logo.svg"
                        }
                        alt="logo"
                        className="w-10 h-10 rounded-full"
                    />
                </a>
            </div>
        </nav>
    );
}
