"use client";

import React, { useState } from "react";
import Button from "@/components/interactives/Button";
import "@/resources/styling/components/interactives/navbar.scss";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="topbar navBar">
            <div className={"hamburger-top"}>
                <Link href={"/"}>
                    <Image
                        src={"/branding/logo_temp.png"}
                        className="logoImage"
                        height={75}
                        width={150}
                        alt="Logo Image"
                    />
                </Link>
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
                    <Button type="link" linkTo="/faq">
                        FAQ
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/use-cases">
                        Use cases
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/pricing">
                        Pricing
                    </Button>
                </li>
                <li>
                    <Button type="link" linkTo="/contact">
                        Contact
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
