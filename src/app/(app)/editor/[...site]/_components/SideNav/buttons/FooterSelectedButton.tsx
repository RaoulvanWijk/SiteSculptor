import FooterSelected from "@/components/editor-drag-components/footer/FooterSelected";
import useSideNav from "@/components/hooks/useSideNav";
import "@/resources/styling/components/SideNav/SideNavButton.scss";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import React from "react";

type navBarProps = {
    name: string;
    id: string;
    styles: any;
};

export default async function NavBarSelectButton({
    name,
    id,
    styles,
}: navBarProps) {
    const { site_id, setSiteFooter } = useSideNav();

    const changeFooter = async () => {
        const response = await fetch("/api/editor/site_footer/set", {
            method: "PUT",
            body: JSON.stringify({ siteId: site_id, footerId: id }),
        });
        const data = await response.json();
        setSiteFooter(data);
    };

    let currentStyle = {};
    for (const style in styles) {
        // currentStyle += `${style}: ${styles[style]};`;
        currentStyle = { ...currentStyle, [style]: styles[style] };
    }

    return (
        <button className="sidenavbutton" onClick={changeFooter} id={id}>
            <FooterSelected
                className="navbarselected-sidenav"
                sideNav={true}
                stijl={currentStyle}
            />
        </button>
    );
}
