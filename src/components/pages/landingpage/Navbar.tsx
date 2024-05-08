"use client";

import React, { useState } from "react";
import Button from "@/components/interactives/Button";
import "@/resources/styling/components/interactives/navbar.scss";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="topbar navBar">
            <div className={"hamburger-top"}>
                <Image
                    src={"/branding/logo_temp.png"}
                    className="logoImage"
                    height={75}
                    width={150}
                    alt="Logo Image"
                />
                {/* Hamburger Icon */}
                <div className="hamburgerIcon" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <menu
                className={`navMenu navLinks ${
                    isMenuOpen ? "is-responsive" : ""
                }`}
            >
                <li>
                    <Button type="link" linkTo="/">
                        Home
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/">
                        FAQ
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/">
                        Use cases
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/">
                        Pricing
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/login">
                        Login
                    </Button>
                </li>
                <li>
                    <Button type="primary" linkTo="/login">
                        Get started
                    </Button>
                </li>
            </menu>
        </nav>
    );
}
