"use client";

import React, { useState } from "react";
import DefaultButton from "@/components/interactives/DefaultButton";
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
                        <DefaultButton
                            buttonName="Home"
                            type="link"
                            linkTo=""
                        />
                        <DefaultButton buttonName="FAQ" type="link" linkTo="" />
                        <DefaultButton
                            buttonName="Examples"
                            type="link"
                            linkTo=""
                        />
                        <DefaultButton
                            buttonName="Pricing"
                            type="link"
                            linkTo=""
                        />
                        <DefaultButton
                            buttonName="Login/Register"
                            type="linkPrimary"
                            linkTo=""
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
