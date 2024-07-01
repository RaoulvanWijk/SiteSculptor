import NavBarSelected from "@/components/editor-drag-components/navbar/NavBarSelected";
import useSideNav from "@/components/hooks/useSideNav";
import "@/resources/styling/components/SideNav/SideNavButton.scss";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import React from "react";

type navBarProps = {
    name: string;
    id: string;
    styles: any;
};

export default function NavBarSelectButton({
    name,
    id,
    styles,
}: navBarProps) {
    const { site_id, setSiteNavbar } = useSideNav();

    const changeNav = async () => {
        const response = await fetch("/api/editor/site_navbar/set", {
            method: "PUT",
            body: JSON.stringify({ siteId: site_id, navbarId: id }),
        });
        const data = await response.json();
        setSiteNavbar(data);
    };

    let currentStyle = {};
    for (const style in styles) {
        // currentStyle += `${style}: ${styles[style]};`;
        currentStyle = { ...currentStyle, [style]: styles[style] };
    }

    return (
        <button className="sidenavbutton" onClick={changeNav} id={id}>
            <NavBarSelected
                className="navbarselected-sidenav"
                sideNav={true}
                stijl={currentStyle}
            />
        </button>
    );
}
