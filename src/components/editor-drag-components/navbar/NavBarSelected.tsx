import React from "react";
import "@/resources/styling/components/SideNav/navbarselected.scss";

export default function NavBarSelected(stijl: any, pages: any) {
    return (
        <nav className="navbarselected" style={stijl.stijl}>
            <div>LOGO</div>
            <menu>PAGES</menu>
        </nav>
    );
}
