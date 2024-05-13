import React from "react";
import "@/resources/styling/components/SideNav/navbarselected.scss";
import useSideNav from "@/components/hooks/useSideNav";

export default function NavBarSelected(stijl: any, pages: any[]) {
    const { page } = useSideNav();

    return (
        <nav className="navbarselected" style={stijl.stijl}>
            <div>LOGO</div>
            <menu>
                {page.map((page) => (
                    <li key={page.id}>
                        <a href={page.id}>{page.title}</a>
                    </li>
                ))}
            </menu>
        </nav>
    );
}
