import "@/resources/styling/components/SideNav/SideNavButton.scss";
import "@/resources/styling/components/SideNav/breadcrumbs.scss";
import React from "react";

type navBarProps = {
    name: string;
    id: string;
};

export default function NavBarSelectButton({ name, id }: navBarProps) {
    const changeNav = () => {};
    return (
        <button className="sidenavbutton" onClick={changeNav} id={id}>
            <span>{name}</span>
        </button>
    );
}
