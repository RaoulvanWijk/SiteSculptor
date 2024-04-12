"use client";

import Link from "next/link";
import Image from "next/image";
import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/Button";
import { useSession } from "next-auth/react";
import DialogBox from "./DialogBox";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="barstyling navbar">
            <div>
                <Link href="/app/dashboard"><Image src="/branding/logo_temp.png" alt="Logo" className="logo" width={1000} height={1000} /></Link>
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
                <DialogBox title="Create a new Project" description="Give your Project a name">New Project</DialogBox>

                <Image
                    src={
                        session
                            ? session.user.image || "/logo.svg"
                            : "/logo.svg"
                    }
                    alt="logo"
                    className="w-10 h-10 rounded-full border-2 border-purple-500"
                    width={100} height={100}
                />

            </div>
        </nav>
    );
}
