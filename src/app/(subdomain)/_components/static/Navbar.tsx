import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={`navbar`}>
            <div className={"hamburger-top"}>
                <Link href={"/"}>LOGO</Link>
                <div className="hamburgerIcon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <menu className={`navbarselected-items}`}></menu>
        </nav>
    );
}
