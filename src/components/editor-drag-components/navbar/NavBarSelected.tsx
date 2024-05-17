import React from "react";
import "@/resources/styling/components/SideNav/navbarselected.scss";
import useSideNav from "@/components/hooks/useSideNav";

export default function NavBarSelected({ className, stijl, sideNav }: any) {
    const { page } = useSideNav();

    if (sideNav) {
        return (
            <nav className={`navbarselected ${className}`} style={stijl}>
                <div>LOGO</div>
                <menu className="navbarselected-items">
                    <li>
                        <a href="#">Home</a>
                    </li>
                </menu>
            </nav>
        );
    } else {
        return (
            <nav className={`navbarselected ${className}`} style={stijl}>
                <div>LOGO</div>
                <menu className="navbarselected-items">
                    {page.map((page) => (
                        <li key={page.id}>
                            <a href={page.id}>{page.title}</a>
                        </li>
                    ))}
                </menu>
            </nav>
        );
    }
}
