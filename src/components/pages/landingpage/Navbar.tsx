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
        <nav>
            <div className="topbar navBar">
                <Image
                    src={"/branding/logo_temp.png"}
                    className="logoImage"
                    height={75}
                    width={150}
                    alt="Logo Image"
                />

                <div className={`navMenu ${isMenuOpen ? "is-responsive" : ""}`}>
                    {/* Hamburger Icon */}
                    <div className="hamburgerIcon" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="navLinks">
                        <Button type="link" linkTo="/">
                            Home
                        </Button>
                        <Button type="link" linkTo="/">
                            FAQ
                        </Button>
                        <Button type="link" linkTo="/">
                            Examplles
                        </Button>
                        <Button type="link" linkTo="/">
                            Pricing
                        </Button>
                        <Button type="primary" linkTo="">
                            Login / Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
