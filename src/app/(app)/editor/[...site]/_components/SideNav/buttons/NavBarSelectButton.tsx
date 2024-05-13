import NavBarSelected from "@/components/editor-drag-components/navbar/NavBarSelected";
import "@/resources/styling/components/SideNav/SideNavButton.scss";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import React from "react";

type navBarProps = {
    name: string;
    id: string;
    styles: any;
};

export default function NavBarSelectButton({ name, id, styles }: navBarProps) {
    const changeNav = () => {
        fetch("api/editor/site_navbar");
    };

    let currentStyle = {};
    for (const style in styles) {
        // currentStyle += `${style}: ${styles[style]};`;
        currentStyle = { ...currentStyle, [style]: styles[style] };
    }

    return (
        <button className="sidenavbutton" onClick={changeNav} id={id}>
            <NavBarSelected stijl={currentStyle} />
        </button>
    );
}
